export class Event {
    id: string;
    title: string;
    description: string;
    dateTime: Date;
    joiners: string[];
    capacity: number;
    authorUID: string;

    constructor({
        id,
        title,
        description,
        date,
        time,
        joiners,
        capacity,
        authorUID,
    }: {
        id: string;
        title: string;
        description: string;
        date: string;
        time: string;
        capacity: string;
        authorUID: string;
        joiners: string[];
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.joiners = joiners;
        this.dateTime = this.parseTime(date, time);
        this.capacity = parseInt(capacity);
        this.authorUID = authorUID;
    }

    private parseTime(date: string, time: string) {
        const [hours, minutes] = time.split(':');
        const bar = new Date(date);

        bar.setHours(+hours);
        bar.setMinutes(+minutes);

        return bar;
    }
}
