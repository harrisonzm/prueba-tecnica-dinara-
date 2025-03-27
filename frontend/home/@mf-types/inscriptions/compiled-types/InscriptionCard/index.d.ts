import React from 'react';
import { Inscription } from '../utils/index.types';
interface InscriptionCardProps {
    inscription: Inscription;
    onDeleted?: () => void;
}
export declare const InscriptionCard: React.FC<InscriptionCardProps>;
export default InscriptionCard;
