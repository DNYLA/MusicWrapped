import { useEffect, useState } from 'react';
import './App.css';
import { MusicWrapped } from './utils/APIHandler';

type Tracks = {
  artists: any;
  name: string;
  album?: any;
};

const loadingTracks: Tracks = {
  artists: 'Bob Ross',
  name: 'Jihaa',
  album: { images: [{ url: 'http:www.com' }] },
};

export const MenuTable = () => {
  const [data, setData] = useState([loadingTracks]);

  useEffect(() => {
    MusicWrapped.tracksTest().then((res: any) => {
      console.log(res);
      setData(res.items);
    });
  }, []);

  if (data == null) {
    return <div></div>;
  }

  console.log(data);

  return (
    <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Song
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Artist
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Album
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Explicit
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <a href="#" className="block relative">
                            <img
                              alt="profil"
                              src={
                                item.album.images[0].url
                                  ? item.album.images[0].url
                                  : 'http:wwww.'
                              }
                              className="mx-auto object-cover rounded-full h-10 w-10 "
                            />
                          </a>
                        </div>
                        <div className="ml-3">
                          <p className="text-gray-900 whitespace-no-wrap">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.artists[0].name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.album.name}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.album.release_date}
                      </p>
                      {/* <span className="relative inline-block px-5 py-2 font-semibold text-green-900 leading-tight">
                
                      </span> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
