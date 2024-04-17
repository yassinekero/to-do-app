
export class IntervalTimer {
    private _intervalId: NodeJS.Timeout
    private _callback: Function;
    private _startTime: number;
    private _paused: boolean = false;
    private _timerComponent: any;
    private _delay: number;
    private _remaining: number;


    get remaining(): number {
        return this._remaining;
    }
    constructor(callback: Function, delay: number, timerComponent: any) {
        this._callback = callback;
        this._delay = delay;
        this._timerComponent = timerComponent;
    }
    public run() {
        this._startTime = new Date().getTime();
        this._callback.call(this._timerComponent);
    }
    public start(): void {
        this.clear();
        this._startTime = new Date().getTime();
        this._intervalId = setInterval(() => {
            this.run();
        }, this._delay);
    }
    public pause() {
        if (!this._paused) {
            this.clear();
            this._remaining = new Date().getTime() - this._startTime;
            this._paused = true;
        }
    }

    public resume() {
        if (this._paused) {
                this.run();
                this._paused = false;
                this.start();
        }
    }
    public clear(): void {
        clearInterval(this._intervalId);
    }
}