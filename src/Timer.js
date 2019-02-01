import moment from 'moment';
import fire from './fire';


export default class Timer {
    data = {
        'id': 0,
        'time': moment().format('HH:mm'),
        'timestamp': moment(),
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
        this.data['timestamp'] = time;
    }

    save = () => {
        this.data['id'] = Math.floor(Math.random() * 9999);
        const firebaseData = {
            'active': true,
            'time': this.data['time'],
            'monday': this.data['days'][0]['alarm'],
            'tuesday': this.data['days'][1]['alarm'],
            'wednesday': this.data['days'][2]['alarm'],
            'thursday': this.data['days'][3]['alarm'],
            'friday': this.data['days'][4]['alarm'],
            'saturday': this.data['days'][5]['alarm'],
            'sunday': this.data['days'][6]['alarm'],
        };
        // Save timer in database
        fire.database().ref('timer/' + this.data['id']).set(firebaseData);
    }
}
