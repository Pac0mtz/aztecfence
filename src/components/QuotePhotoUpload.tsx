import { useEffect, useId, useState } from "react";
import { Camera } from "lucide-react";

const MAX_FILES = 5;
const MAX_BYTES = 8 * 1024 * 1024;
const ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif,image/gif";

export default function QuotePhotoUpload() {
  const id = useId();
  const inputId = `${id}-photos`;
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<{ url: string; name: string }[]>([]);

  useEffect(() => {
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, [previews]);

  function onFilesChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const input = e.target;
    const list = Array.from(input.files || []);
    const tooBig = list.find((f) => f.size > MAX_BYTES);
    if (tooBig) {
      setError(`Each photo must be under 8 MB. "${tooBig.name}" is too large.`);
      input.value = "";
      setPreviews([]);
      return;
    }
    if (list.length > MAX_FILES) {
      setError(`You can attach up to ${MAX_FILES} photos.`);
      input.value = "";
      setPreviews([]);
      return;
    }
    setPreviews((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return list.map((f) => ({ url: URL.createObjectURL(f), name: f.name }));
    });
  }

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label htmlFor={inputId} className="block text-[13px] sm:text-sm font-bold text-gray-700">
        Photos of the property <span className="font-normal text-gray-500">(optional)</span>
      </label>
      <p className="text-xs text-gray-500">
        Yard, existing fence, or gate - up to {MAX_FILES} photos. Use your camera or photo library.
      </p>
      <input
        id={inputId}
        name="photos"
        type="file"
        accept={ACCEPT}
        multiple
        onChange={onFilesChange}
        className="sr-only"
      />
      <label
        htmlFor={inputId}
        className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 cursor-pointer rounded-xl sm:rounded-2xl border-2 border-dashed border-cyan-300 bg-cyan-50/50 px-4 py-5 sm:py-7 text-center hover:bg-cyan-50 hover:border-cyan-400 transition-colors"
      >
        <Camera size={24} className="text-cyan-600 shrink-0" />
        <span className="font-bold text-[#0f172a]">Add photos or take a picture</span>
        {previews.length > 0 && (
          <span className="text-sm text-cyan-700">
            {previews.length} photo{previews.length === 1 ? "" : "s"} selected
          </span>
        )}
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {previews.length > 0 && (
        <ul className="flex flex-wrap gap-3 pt-1">
          {previews.map((p) => (
            <li key={p.url} className="h-20 w-20 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
              <img src={p.url} alt="" className="h-full w-full object-cover" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
