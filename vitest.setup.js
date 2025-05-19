import { createPinia, setActivePinia } from 'pinia';
import '@testing-library/jest-dom';

const pinia = createPinia();
setActivePinia(pinia);
