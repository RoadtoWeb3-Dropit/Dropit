
import styles from "./dropcard.module.css";

export default function DropCard({ name, desc, type, status }) {

    return (
        <div className={styles.card}>
            <h2>Name: {name}</h2>
            <div>
                <h3>Description: {desc}</h3>
                <h3>Type: {type}</h3>
                <h3>Status: {status ? "Dropped" : "Ready to drop"}</h3>
            </div>
        </div>
    );
}
//name={availableDrop.dropName} desc={availableDrop.dropDescription} type={availableDrop.dropType} status={availableDrop.dropStatus}