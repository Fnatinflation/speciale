
export default function VideoPlayer(props) {
    return (
        <div className="video-responsive">
            <iframe
                width="609"
                height="400"
                src={props.videoUrl}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
        </div>
    )
}