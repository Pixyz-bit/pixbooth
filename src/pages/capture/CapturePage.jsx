import CaptureIntro from '../../components/capture/CaptureIntro.jsx';
import FaceStickerPanel from '../../components/capture/FaceStickerPanel.jsx';
import CameraPreview from '../../components/capture/CameraPreview.jsx';
import CaptureActions from '../../components/capture/CaptureActions.jsx';
import CapturedGallery from '../../components/capture/CapturedGallery.jsx';
import PhotoSettings from '../../components/capture/PhotoSettings.jsx';
import CaptureFeedback from '../../components/capture/CaptureFeedback.jsx';
export default function CapturePage({ session }) {
  return (
    <main className="capture-main">
      <CaptureIntro {...session} />
      <div className="booth-layout">
        <div className="sidebar-column">
          <FaceStickerPanel {...session} />
        </div>
        <div className="camera-column">
          <CameraPreview {...session} />
          <CaptureActions {...session} />
        </div>
        <div className="preview-column">
          <CapturedGallery {...session} />
          <PhotoSettings {...session} />
        </div>
      </div>
      <CaptureFeedback {...session} />
    </main>
  );
}
