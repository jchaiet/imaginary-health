import { useEffect } from "react";
import { ObjectInputProps, useFormValue, set } from "sanity";

export function SyncedImageInput(props: ObjectInputProps) {
  const { value, onChange, path } = props;

  const featuredImage = useFormValue(["featuredImage"]);
  const docType = useFormValue(["_type"]);

  const parentBlockType = useFormValue([...path.slice(0, -1), "_type"]) as
    | string
    | undefined;

  const isTarget =
    docType === "blog" &&
    parentBlockType === "heroBlock" &&
    path[path.length - 1] === "image";

  useEffect(() => {
    if (
      isTarget &&
      !value &&
      featuredImage &&
      typeof featuredImage === "object"
    ) {
      onChange(set(featuredImage));
    }
  }, [isTarget, featuredImage, value, onChange]);

  return props.renderDefault(props);
}
