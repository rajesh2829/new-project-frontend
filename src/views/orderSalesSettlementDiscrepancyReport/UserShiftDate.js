import React from 'react';
import UserCard from '../../components/UserCard';


const UserShiftDate = (props) => {

    const { data } = props
    return (
        <div className="text-left" style={{ display: 'flex', minWidth: "250px", maxWidth: "400px" }}>
            <div style={{ flex: 1 }}>
                <div>{data.location} </div>
                <div >{data.date} <span className='mx-2'>{data.shift} </span></div>
                <UserCard
                    customSize={parseInt(40, 10)}
                    firstName={data.name}
                    url={data.image}
                    lastName={data.last_name}
                />
            </div>
        </div>

    );
};

export default UserShiftDate;