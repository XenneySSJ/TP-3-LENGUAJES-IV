import ImageUploader from "../components/ImageUploader";
import "../components/ImageUploader.css";
import "../components/ui.css";

export default function Upload() {
  return (
    <div className="container">
      <div className="card">
        <ImageUploader />
      </div>
    </div>
  );
}
