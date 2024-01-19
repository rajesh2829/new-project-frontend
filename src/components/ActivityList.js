import React from 'react';

// Components
import ReduxTable, { ReduxColumn } from './reduxTable';

//Config
import { endpoints } from '../api/endPoints';
import DateTime from '../lib/DateTime';
import Url from '../lib/Url';
import UserCard from './UserCard';

const ActivityList = (props) => {
  const { id, objectId, object_name, tab } = props;

  //Sort By Option Values
  const sortByOption = [
    {
      value: 'id:DESC',
      label: 'Most Recent',
    },
  ];

  return (
    <ReduxTable
      id={'history'}
      showSearch
      apiURL={`${endpoints().systemLogAPI}`}
      params={{
        objectId: objectId,
        objectName: object_name,
        section: Url.GetParam('section') ? Url.GetParam('section') : '',
      }}
      sortByOptions={sortByOption}
      history={props?.history}
      paramsToUrl={true}
    >
      <ReduxColumn
        field='createdAt'
        sortBy='createdAt'
        renderField={(row) => (
          <span>
            {DateTime.getDateTimeByUserProfileTimezone(row.createdAt)}
          </span>
        )}
      >
        Date
      </ReduxColumn>
      <ReduxColumn
        field='userName'
        sortBy='user_id'
        renderField={(row) => (
          <>
            <UserCard
              customSize={parseInt(50, 10)}
              firstName={row.first_name}
              lastName={row.last_name}
              url={row.media_url}
            />
          </>
        )}
      >
        User
      </ReduxColumn>
      <ReduxColumn
        field='message'
        sortBy='message'
        renderField={(row) => (
          <div>
            {row && row.message.length > 0 && row.message.map((item, index) => <p style={{ marginBottom: "6px" }} key={index}>{item}</p>)}
          </div>
        )}
      >
        Message
      </ReduxColumn>
    </ReduxTable>
  );
};
export default ActivityList;
