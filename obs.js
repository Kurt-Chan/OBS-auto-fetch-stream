#!/usr/bin/env node

const OBSWebSocket = require('obs-websocket-js').default;
require('dotenv').config();  // Load environment variables from .env file

// Fetch all the config from the env file
const obs1Config = {
    name: "OBS1",
    ip: process.env.MINIPC_IP,
    port: process.env.OBS1_PORT,
    password: process.env.OBS1_PASSWORD,
    sceneName: process.env.OBS1_SCENE_NAME,
    mediaSourceName: process.env.OBS1_MEDIA_SOURCE_NAME,
    rtspUrl: process.env.OBS1_RTSP_URL,
    rtmpKey: process.env.OBS1_STREAM_KEY,
};

const obs2Config = {
    name: "OBS2",
    ip: process.env.MINIPC_IP,
    port: process.env.OBS2_PORT,
    password: process.env.OBS2_PASSWORD,
    sceneName: process.env.OBS2_SCENE_NAME,
    mediaSourceName: process.env.OBS2_MEDIA_SOURCE_NAME,
    rtspUrl: process.env.OBS2_RTSP_URL,
    rtmpKey: process.env.OBS2_STREAM_KEY,
};

async function obsMain(config) {
    const obs = new OBSWebSocket();
    try {
        const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect(
            `ws://${config.ip}:${config.port}`,
            config.password
        );
        console.log(`${config.name}: Connected to OBS WebSocket v${obsWebSocketVersion} (RPC ${negotiatedRpcVersion})`);

        const { inputs } = await obs.call('GetInputList');
        const inputExists = inputs.some(i => i.inputName === config.mediaSourceName);

        // Check if the media source is already created
        if (inputExists) {
            await obs.call('SetInputSettings', {
                inputName: config.mediaSourceName,
                inputSettings: {
                    input: config.rtspUrl
                },
                overlay: true
            });
        } else {
            await obs.call('CreateInput', {
                sceneName: config.sceneName,
                inputName: config.mediaSourceName,
                inputKind: 'ffmpeg_source',
                inputSettings: {
                    local_file: '',
                    is_local_file: false,
                    input: config.rtspUrl
                }
            });
        }

        // Auto scale the stream based on the canvass size (1920x1080)
        const { sceneItems } = await obs.call('GetSceneItemList', { sceneName: config.sceneName });
        const sceneItem = sceneItems.find(item => item.sourceName === config.mediaSourceName);
        if (sceneItem) {
            const { baseWidth, baseHeight } = await obs.call('GetVideoSettings');
            await obs.call('SetSceneItemTransform', {
                sceneName: config.sceneName,
                sceneItemId: sceneItem.sceneItemId,
                sceneItemTransform: {
                    boundsType: 'OBS_BOUNDS_SCALE_INNER',
                    boundsAlignment: 0,
                    boundsWidth: baseWidth,
                    boundsHeight: baseHeight,
                    positionX: 0,
                    positionY: 0
                }
            });
        }

        // Source Filter
        // Checks if the Detect plugin is already set, if not set it automatically (apply filters)
        const { filters } = await obs.call('GetSourceFilterList', { sourceName: config.mediaSourceName })
        const filter = filters.find(item => item.filterName === 'Detect');

        if (filter) {
            // if filter is found, apply the settings
            await obs.call('SetSourceFilterSettings', {
                sourceName: config.mediaSourceName,
                filterName: 'Detect',
                filterSettings: {
                    detected_object: "person",
                    object_category: 0,
                    masking_group: true,
                    masking_type: "pixelate",
                    masking_blur_radius: 20,
                    dilation_iterations: 10,
                    advanced: true,
                    sort_tracking: true,
                    model_size: "medium"
                },
                overlay: true
            })
        }
        else {
            // if filter is not found, create a filter
            await obs.call('CreateSourceFilter', {
                sourceName: config.mediaSourceName,
                filterName: 'Detect',
                filterKind: 'detect-filter',
                filterSettings: {
                    detected_object: "person",
                    object_category: 0,
                    masking_group: true,
                    masking_type: "pixelate",
                    masking_blur_radius: 20,
                    dilation_iterations: 10,
                    advanced: true,
                    sort_tracking: true,
                    model_size: "medium"
                },
            });
        }

        // Set stream configuration
        await obs.call('SetStreamServiceSettings', {
            streamServiceType: 'rtmp_custom',
            streamServiceSettings: {
                server: process.env.RTMP_SERVER,
                key: config.rtmpKey
            }
        });

        // Start Stream
        await obs.call('StartStream');
        console.log(`${config.name}: Streaming started!`);
    } catch (error) {
        console.error(`${config.name} Error:`, error);
    }
}


async function main() {
    // Run all functions in a promise
    await Promise.all([
        obsMain(obs1Config),
        obsMain(obs2Config)
    ]);
    console.log("Both OBS instances are streaming.");
}

main();
