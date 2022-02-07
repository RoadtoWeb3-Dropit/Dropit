import DropCard from "../drop_card/drop_card";
import { getDrops } from "../../../../pages/api/admin";
import { useEffect, useState } from "react";

const axios = require('axios');


export default function Drops({ wallet }) {
    const [availableDrop, setAvailableDrop] = useState([]);

    useEffect(() => {
        axios.get("https://backendforweb3.herokuapp.com/drop/" + wallet)
    .then(res => {
        console.log(res, "res");
        setAvailableDrop(res.data);
    })
    .catch(err => {
        console.log(err, "err");
    })
    }, [])


    return(
        <div>
        {
            availableDrop.length ? availableDrop.map((d) => {
                return <DropCard
                    key={d.dropName}
                    name={d.dropName}
                    desc={d.dropDescription}
                    type={d.dropType}
                    status={d.dropStatus}
                    assetUrl={d?.metadata?.imgLink}
                />
            }) 
            : ''
        }
        </div>
    );
}
