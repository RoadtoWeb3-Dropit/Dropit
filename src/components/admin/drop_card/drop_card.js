
import styles from "./dropcard.module.css";

export default function DropCard({ details }) {
    console.log(details);
    return (
        <div className={styles.card}>
            <h2>{details.name}</h2>
            <div>
                <h3>{details.type}</h3>
                <h3></h3>
            </div>
        </div>
    );
}