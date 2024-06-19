import { useRef } from "react";
import Button from "./Button";

type Props = {
  file: File | undefined;
  preview: string | null;
  pickedHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageSent: () => void;
  onInput?(file: File | undefined): void;
  error: string | null;
};

export default function ImageUploudSecond(props: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const pickImageHandler = () => {
    fileRef.current?.click();
  };

  return (
    <>
      <div>
        <input
          ref={fileRef}
          id={"image-1"}
          type="file"
          name="image"
          style={{ display: "none" }}
          accept=".jpg,.png,.jpeg"
          onChange={(e) => props.pickedHandler(e)}
        />
      </div>
      <div className=" flex flex-col items-center  justify-center">
        <div className="border-2 rounded-lg w-44 h-44 mb-4">
          {props.preview && <img src={props.preview} className="w-full h-full bg-cover bg-no-repeat" alt="preview" />}
          {!props.preview && <p>No image picked</p>}
        </div>
        <div className="flex space-x-3">
          <Button btnAttribute={{ type: "button", onClick: pickImageHandler }}>Pick Image</Button>
          {/* {props.preview && (
            <Button btnAttribute={{ type: "button", onClick: props.handleImageSent }}>Remove Image</Button>
          )} */}
        </div>
        {props.error && <p className="text-red-500 my-1.5">{props.error}</p>}
      </div>
    </>
  );
}
