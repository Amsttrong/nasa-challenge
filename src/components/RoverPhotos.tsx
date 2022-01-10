import { useEffect, useState } from "react";
import { getPhotos, RoverPhotosDTO } from "../api/rovers-photos";

const PHOTOS_PER_PAGE = 25;

type RoverPhotosProps = {
  rover: string;
  camera?: string;
  sol?: number;
  earthDay: Date | null;
};

export function RoverPhotos({ rover, camera, sol, earthDay }: RoverPhotosProps) {
  const [photos, setPhotos] = useState<RoverPhotosDTO | undefined>();
  const [page, setPage] = useState(1);
  const isFirstPage = page === 1;
  const isLastPage = photos !== undefined && photos.photos.length < PHOTOS_PER_PAGE;

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
      <div className="paginators">
        {!isFirstPage && (
          <button className="pagination-icons" onClick={() => setPage((prev) => prev - 1)}>
            ◀
          </button>
        )}
        {!isLastPage && (
          <button className="pagination-icons" onClick={() => setPage((prev) => prev + 1)}>
            ▶
          </button>
        )}
      </div>
      <div className="grid">
        {photos?.photos.map((photo) => (
          <div className="grid-images">
            <img src={photo.img_src} alt="Mars" />
          </div>
        ))}
      </div>
    </div>
  );
}
