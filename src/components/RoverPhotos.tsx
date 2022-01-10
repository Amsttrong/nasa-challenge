import { useEffect, useState } from "react";
import { getPhotos, RoverPhotosDTO } from "../api/rovers-photos";

type RoverPhotosProps = {
  rover: string;
  camera?: string;
  sol?: number;
  earthDay: Date | null;
  page?: number;
};

export function RoverPhotos({ rover, camera, sol, earthDay, page }: RoverPhotosProps) {
  const [photos, setPhotos] = useState<RoverPhotosDTO | undefined>();

  useEffect(() => {
    getPhotos(rover, {
      sol,
      camera,
      earth_date: earthDay,
      page,
    }).then((res) => setPhotos(res));
  }, [page, rover, camera, sol, earthDay]);

  return (
    <div className="main-photos">
      {photos?.photos.map((photo) => (
        <div className="image-container">
          <img src={photo.img_src} alt="Mars" />
        </div>
      ))}
    </div>
  );
}
