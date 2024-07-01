import { removeUser } from '@/tools/actions';
import { LOGOUT, ROUTER_PATH } from '@/tools/constants';
import React from 'react';


const ButtonComponent: React.FC = () => {
    return (
        <form action={ROUTER_PATH.API.USER} method="POST">
            <input type="hidden" name="action" value={LOGOUT} />
            <button type="submit" className="block px-4 w-full py-2 text-sm text-gray-700 hover:bg-gray-100  ">
                Cerrar Sesion
            </button>
        </form>

    );
}

export default ButtonComponent;