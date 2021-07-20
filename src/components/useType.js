import React, {useState} from 'react';

const useType = (state) => {
    const [workedon, setmode] = useState(true)
    if (state) {
        setmode(true)
    }
    else{
        setmode(true)
    }
    return workedon
}

export default useType;