
export class Courses {
    id?: number;
    title?: string;
    price?: number;
    picture?: any;

    constructor(data: Courses) {
        this.id = data.id;
        this.title = data.title;
        this.price = data.price;
        this.picture = this.picture;
    }

}