import { SortAscendingIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { Range } from '../api/UserAPI';
import { MusicWrapped } from '../utils/APIHandler';

interface mTableProps {
  range: Range;
}

type Artist = {
  name: string;
  images?: any;
  followers: any;
  external_urls: any;
};

const loadingTracks: Artist = {
  name: 'Loading...',
  followers: {
    total: '0',
  },
  external_urls: {
    spotify: 'na',
  },
};

export const TopArtistsTable = ({ range }: mTableProps) => {
  const [data, setData] = useState([loadingTracks]);

  useEffect(() => {
    MusicWrapped.User.getTopArtists(range).then((res: any) => {
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
                    Artist
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Followers
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    Most Played Track
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
                                item.images ? item.images[0].url : 'http:wwww.'
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
                      <p className="text-gray-900 whitespace-no-wrap">
                        {item.followers.total}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">WIP</p>
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
