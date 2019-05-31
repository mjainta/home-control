import moment from 'moment';
import axios from 'axios';


export default class Timer {
    data = {
        'id': 0,
        'time': moment().format('HH:mm'),
        'days': [
        {
            'key': 'monday',
            'displayname': 'Mon',
            'alarm': false,
        },
        {
            'key': 'tuesday',
            'displayname': 'Tue',
            'alarm': false,
        },
        {
            'key': 'wednesday',
            'displayname': 'Wed',
            'alarm': false,
        },
        {
            'key': 'thursday',
            'displayname': 'Thu',
            'alarm': false,
        },
        {
            'key': 'friday',
            'displayname': 'Fri',
            'alarm': false,
        },
        {
            'key': 'saturday',
            'displayname': 'Sat',
            'alarm': false,
        },
        {
            'key': 'sunday',
            'displayname': 'Sun',
            'alarm': false,
        },
        ]
    };

    switchAlarm(day) {
        // Search for dayArray with given day using filter()
        // and switch alarm using map()
        this.data.days
            .filter(dayArr => dayArr.key === day)
            .map((dayArr) => dayArr.alarm = !dayArr.alarm)
    };

    changeTime = (time) => {
        this.data['time'] = time.format('HH:mm');
    }

    save = (callback) => {
        // Save timer in database
        console.log(this.data);
        const url = process.env.REACT_APP_BACKEND_URL + "/timer";
        axios({
            method: 'post',
            url,
            data: this.data
        })
        .then(() => callback())
        .catch(err => console.log(err))
    }
}
