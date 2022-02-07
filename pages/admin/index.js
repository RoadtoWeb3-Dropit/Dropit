import { useState } from "react";
import DropCard from "../../src/components/admin/drop_card/drop_card";

import { createDrop } from "../api/admin";

import styles from "../../styles/admin.module.css";

export default function admin() {
    const [drops, setDrops] = useState([]);
// {name:"Dropped Down Bad", type: "Timed"}, {name:"Dropped Down Bad", type: "Timed"}
    const handleSubmit = (e) => {
        e.preventDefault();
        let name = e.target[0].value;
        let type = e.target[1].value;
        let errField = document.getElementsByClassName(styles.error)[0];
        errField.textContent = "";

        if (name === "") {
            errField.textContent = "Name cannot be empty.";
        } else {
            createDrop({ id: "lol", organizerWallet: name, metadata: {foo: "foo"}, dropStatus: false, registeredWallets: []})
            .then((foo) => {
                console.log(foo);
            })
            // drops.push({ name, type });
            // let newDrops = [...drops];

            // setDrops(newDrops);
        }
    }
    console.log(Array.isArray(drops));

    return(
        <div className={styles.admin}>
            <div className={styles.addBlock}>
                <p className={styles.addTitle}>Create new DropIt</p>
                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder="Drop name"/>
                    <select name="type">
                        <option value="sportcheck">Sport Check</option>
                        <option value="tim_hortons">Tim Hortons</option>
                        <option value="tim_hortons">Subway</option>
                        <option value="other">Other</option>
                    </select>
                    <p className={styles.error}></p>
                    <input type="submit" value="Create Drop"/>
                </form>
            </div>
            <div className={styles.drops}>
                {
                    drops.length ? drops.map((d, idx) => {
                        return <DropCard key={"drop-" + idx.toString()} details={d} />
                    }) : ''
                }
            </div>
        </div>
    );
}
