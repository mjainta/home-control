import moment from 'moment';
import fire from './fire';


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

    save = () => {
        const doc = fire.firestore().collection('timer').doc();
        this.data['id'] = doc.id;
        // Save timer in database
        doc.set(this.data);
    }
}
