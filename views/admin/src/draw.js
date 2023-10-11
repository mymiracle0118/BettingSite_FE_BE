var events = [2,8];

export default {
    check(eid) {
        if(events.includes(eid)){
            return true;
        }
        else{
            return false;
        }
    }
}