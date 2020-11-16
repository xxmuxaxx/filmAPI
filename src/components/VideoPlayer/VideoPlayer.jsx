import React from "react";
import Plyr from "plyr-react";

const VideoPlayer = (props) => {
    return <Plyr source={{
        type: 'video',
        sources: [
            {
                src: props.youtubeId,
                provider: 'youtube',
            },
        ]
    }}
    />
}

export default VideoPlayer