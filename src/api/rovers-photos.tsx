import axios from "axios";
import { API_KEY, BASE_URL } from "../constants/constants";

export type RoverPhotosDTO = {
  photos: [
    {
      id: number;
      camera: {
        id: number;
        name: string;
        rover_id: number;
        full_name: string;
      };
      earth_date: string;
      img_src: string;
      sol: number;
      rover: {
        id: number;
        landing_date: string;
        launch_date: string;
        name: string;
        status: string;
      };
    }
  ];
};

export async function getPhotos(
  rover: string,
  params: { page?: number; sol?: number; camera?: string; earth_date: Date | null }
) {
  try {
    return await axios
      .get<RoverPhotosDTO>(`${BASE_URL}${rover}/photos`, {
        params: {
          ...params,
          API_KEY,
        },
      })
      .then((res) => res.data);
  } catch (err: any) {
    if (err.response.status === 500) {
      alert("Error en el servidor");
    } else {
      alert(err.response.data.Error);
    }
    throw err;
  }
}
