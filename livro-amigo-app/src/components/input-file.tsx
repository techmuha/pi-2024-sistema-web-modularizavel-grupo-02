import {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CameraIcon } from "@heroicons/react/24/outline";

export interface InputFileProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onDrop"> {
  value?: File;
  onDrop?: (file?: File) => void;
}

export function InputFile({
  value: defaultValue,
  onDrop,
  ...props
}: InputFileProps) {
  const [value, setValue] = useState<File | undefined>(undefined);

  const handleOnDrop = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];

      setValue(file);
      onDrop?.(file);
    },
    [onDrop]
  );

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <label>
      <input
        type="file"
        {...props}
        onChange={handleOnDrop}
        className="hidden"
      />

      <div className="flex h-[160px] w-full min-w-[128px] flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-white">
        {!value && (
          <>
            <CameraIcon className="h-8 w-8 text-blue-200" />
            <p className="text-sm text-blue-700">Foto</p>
          </>
        )}

        {!!value && (
          <img
            alt="Imagem anexada"
            src={URL.createObjectURL(value)}
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </label>
  );
}
