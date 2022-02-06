import { useState } from "react";
import DropCard from "./drop_card/drop_card";

import styles from "./admin.module.css";

export default function admin() {
    const [drops, setDrops] = useState([{name:"Dropped Down Bad", type: "Timed"}]);

    const handleSubmit = (e) => {
        e.preventDefault();
        let name = e.target[0].value;
        let type = e.target[1].value;
        let errField = document.getElementsByClassName(styles.error)[0];
        errField.textContent = "";

        if (name === "") {
            errField.textContent = "Name cannot be empty.";
        } else {
            setDrops(drops.push({name, type}));
            console.log(drops ,"drops");
        }
    }

    return(
        <div className={styles.admin}>
            <div className={styles.addBlock}>
                <p className={styles.addTitle}>Create new DropIt</p>
                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" placeholder="Drop name"/>
                    <select name="type">
                        <option value="timed">Timed</option>
                        <option value="instant">Instant</option>
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