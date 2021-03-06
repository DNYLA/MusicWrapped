import { SortAscendingIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { Range } from '../api/UserAPI';
import { MusicWrapped } from '../utils/APIHandler';

interface mTableProps {
  range: Range;
}

type Tracks = {
  artists: any;
  name: string;
  external_urls: any;
  album?: any;
};

const loadingTracks: Tracks = {
  artists: 'Loading...',
  name: 'Loading...',
  external_urls: {
    spotify: 'na',
  },
  album: { images: [{ url: 'https://c.tenor.com/5o2p0tH5LFQAAAAi/hug.gif' }] },
};

export const TopTracksTable = ({ range }: mTableProps) => {
  const [data, setData] = useState([loadingTracks]);

  useEffect(() => {
    MusicWrapped.User.getTopTracks(range).then((res: any) => {
      console.log(res);
      if (res == null) {
        return;
      }
      setData(res.items);
    });
  }, [range]);

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
                    className="px-8 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Release Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <p className="block relative">
                            <img
                              alt="profile"
                              src={
                                item.album.images[0].url
                                  ? item.album.images[0].url
                                  : 'http:wwww.'
                              }
                              className="mx-auto object-cover rounded-full h-10 w-10 "
                            />
                          </p>
                        </div>
                        <div className="ml-3 flex flex-row">
                          <p className=""> {index + 1}.&nbsp;</p>
                          <a
                            className="text-gray-900 whitespace-no-wrap hover:underline"
                            href={
                              item?.external_urls?.spotify
                                ? item.external_urls.spotify
                                : ''
                            }
                            target="_blank"
                          >
                            {item.name}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <a
                        className="text-gray-900 whitespace-no-wrap hover:underline"
                        href={item.artists[0]?.external_urls?.spotify}
                        target="_blank"
                      >
                        {item.artists[0].name}
                      </a>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <a
                        className="text-gray-900 whitespace-no-wrap hover:underline"
                        href={item.album?.external_urls?.spotify}
                        target="_blank"
                      >
                        {item.album.name}
                      </a>
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
