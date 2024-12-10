import { useState } from "react";

const maxLength = 150;

interface AddBiographyProps {
  biography: string;
  onSaveBiography: (text: string) => void;
  onCloseAddBiography: () => void;
}

export default function UpdateBiography({
  biography,
  onSaveBiography,
  onCloseAddBiography,
}: AddBiographyProps) {
  const [text, setText] = useState<string>(biography);

  const handleClose = () => {
    setText(biography);
    onCloseAddBiography();
  };

  const handleSave = () => {
    onSaveBiography(text);
  };

  return (
    <div className="w-full">
      <textarea
        className="w-full h-[80px] resize-none border rounded-md bg-slate-50 text-[14px] text-center py-2 px-2"
        placeholder="Describe yourself"
        maxLength={maxLength}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="text-right">
        <p className="text-xs">
          {text?.length}/{maxLength} character
        </p>
        <div className="mt-2">
          <button
            type="button"
            onClick={handleClose}
            className="mr-2 px-3 py-1 bg-[#e2e5e9] rounded-md hover:bg-[#d1d4d7] group shadow-header-shadown"
          >
            <span className="text-[14px] font-medium group-hover:text-black">
              Cancel
            </span>
          </button>
          <button
            onClick={handleSave}
            type="button"
            className="px-3 py-1 bg-[#e2e5e9] rounded-md hover:bg-[#d1d4d7] group shadow-header-shadown"
          >
            <span className="text-[14px] font-medium group-hover:text-black">
              Save
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
