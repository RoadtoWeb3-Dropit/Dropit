
import styles from "./dropcard.module.css";
import { Heading } from "@chakra-ui/react";

export default function DropCard({ name, desc, type, status, assetUrl }) {

    return (
        <div className={styles.card}>
            <Heading>{name}</Heading>
            <div>
                <h3>Description: {desc}</h3>
                <h3>Type: {type}</h3>
                <h3>Status: {status ? "Dropped" : "Ready to drop"}</h3>
            </div>
            <img src={assetUrl} alt="Image for drop"/>
        </div>
    );
}
//name={availableDrop.dropName} desc={availableDrop.dropDescription} type={availableDrop.dropType} status={availableDrop.dropStatus}
