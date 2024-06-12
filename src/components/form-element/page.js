import React from 'react'
import { Input } from '../ui/input';

const CommonFormElement = ({currentItem, value, onChange}) => {
    let content = null;
    // console.log(onChange);
    switch (currentItem.componentType) {
        case 'input':
            content = (
                <Input
                    name={currentItem.name}
                    id={currentItem.name}
                    placeholder={currentItem.placeholder}
                    value={value}
                    onChange={onChange}
                    type={currentItem.type}

                />
            );
            break;
        // Add more cases as needed for other component types
        default:
            // Fallback to a generic Input component for unrecognized component types
            content = (
                <Input
                    name={currentItem.name}
                    id={currentItem.name}
                    placeholder={currentItem.placeholder}
                    // value={value}
                    onChange={onChange}
                    type={currentItem.type}
                />
            );
            break;
    }

    return content;
};

export default CommonFormElement