export default {
    getClass(eid) {
        switch (eid) {
            case 1:
                return 'football';
                break;
            case 2:
                return 'tennis';
                break;
            case 4:
                return 'cricket';
                break;

            default:
                return '';
                break;
        }
    }
}