import { useId, useState } from 'react'
import { Play } from 'lucide-react'
import videos from '../data/videos.json'
import { resolveEmbed, videoThumbnail } from '../utils/media'
import Modal from './Modal'
import Photo from './Photo'

export default function VideoGallery({ limit }) {
  const source = Array.isArray(videos) ? videos : []
  const items = typeof limit === 'number' ? source.slice(0, limit) : source
  const [active, setActive] = useState(null)
  const titleId = useId()
  const embed = active ? resolveEmbed(active) : ''

  return (
    <>
      {items.length ? (
        <div className="video-grid">
          {items.map((video) => {
            const ready = Boolean(resolveEmbed(video))
            return (
              <article className="video-card" key={video.id}>
                <button type="button" className="video-card__hit" onClick={() => setActive(video)}>
                  <Photo src={videoThumbnail(video)} alt="" />
                  <span className="video-card__play" aria-hidden="true">
                    <Play size={18} strokeWidth={1.6} fill="currentColor" />
                  </span>
                  <span className="sr-only">{ready ? `Play ${video.title}` : `Preview ${video.title}`}</span>
                </button>
                <div className="video-card__body">
                  {!ready ? <span className="chip">Add a YouTube link</span> : null}
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <p className="empty">Add videos to src/data/videos.json. Files are not stored on this website.</p>
      )}
      {active ? (
        <Modal labelledBy={titleId} onClose={() => setActive(null)} wide>
          <p className="eyebrow">Video</p>
          <h2 id={titleId}>{active.title}</h2>
          <p>{active.description}</p>
          <div className="video-frame">
            {embed ? (
              <iframe
                src={embed}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <p>
                This entry does not have a playable YouTube or Vimeo link yet. Paste an ID into youtubeId, a watch URL into url, or an embed URL into embedUrl in videos.json.
              </p>
            )}
          </div>
        </Modal>
      ) : null}
    </>
  )
}
