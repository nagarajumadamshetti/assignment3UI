import React, { useState, useEffect } from 'react';
import { LogoutOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';
const Logout = () => {
    const [logout, ChangeLogout] = useState(false);
    useEffect(() => {
        return function cleanup() {
            ChangeLogout(false)
        };
    })

    const handleLogout =  () => {
        localStorage.removeItem("role");
         localStorage.removeItem("token");
        ChangeLogout(true);
    }
    return (
        <div>
            <Button
                style={{ float: 'right' }} type="primary" onClick={handleLogout}
            ><LogoutOutlined />LOGOUT</Button>
            {logout ?
                (
                    <div
                        style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden' }}
                    >
                        {
                            <Spin tip="Loading...">
                                {window.location.href = '/login'}
                            </Spin>
                        }
                    </div>)
                :
                null
            }
        </div>
    );
}

export default Logout