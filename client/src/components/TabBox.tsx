import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { MenuTable } from './MenuTable';
import { Range } from '../api/UserAPI';

interface ListboxProps {
  selected: any;
  setSelected: any;
  itemList: any;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export function TabBox() {
  let [categories] = useState({
    '4 Weeks': {
      id: 1,
      name: '4 Weeks',
      value: Range.Short,
    },
    '6 Months': {
      id: 2,
      name: '6 Months',
      value: Range.Medium,
    },
    'All Time': {
      id: 3,
      name: 'All Time',
      value: Range.Long,
    },
  });

  return (
    <div className="w-full px-12 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-blue-500 shadow'
                    : 'bg-blue-700 text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {({ selected }) => (
                <button
                  className={
                    selected
                      ? ' text-yellow-400 font-bold'
                      : 'font-bold text-white'
                  }
                >
                  {category}
                </button>
              )}
              {/* {category} */}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'bg-white rounded-xl p-3',
                'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
              )}
            >
              <MenuTable range={posts.value} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
