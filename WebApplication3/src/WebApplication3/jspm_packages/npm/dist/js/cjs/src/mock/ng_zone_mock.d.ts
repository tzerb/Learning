import { NgZone } from 'angular2/src/core/zone/ng_zone';
/**
 * A mock implementation of {@link NgZone}.
 */
export declare class MockNgZone extends NgZone {
    /** @internal */
    private _mockOnStable;
    constructor();
    onStable: any;
    run(fn: Function): any;
    runOutsideAngular(fn: Function): any;
    simulateZoneExit(): void;
}
