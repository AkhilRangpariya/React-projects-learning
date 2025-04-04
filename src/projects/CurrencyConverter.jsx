import React, { useEffect, useState } from 'react'

function useCurrenyInfo(currency) {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(`https://cdn.jsdeliver.net/gh/fawazahmed0/currency-api@1/latest/currecies/${currency}.json`)
            .then(res => res.json())
            .then(res => setData(res[currency]));
        return console.log(data);
    }, [currency])

    return (
        <div>

        </div>
    )
}

export default useCurrenyInfo;
