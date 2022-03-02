export class Term {
    static build(language: string, term: string) {
        return new Term(`/c/${language}/${term.replace(' ', '_')}`, term);
    }
    static from(path: string, label:string){
        return new Term(path, label)
    }
    private _path : string;
    private _label : string;
    constructor (path : string, label: string) {
        this._path = path;
        this._label = label;
    }
    get path() {
        return this._path;
    }

    get label() {
        return this._label;
    }

    isEqualTo(other: Term) {
        return other && this.path === other.path;
    }
}