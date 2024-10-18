/**
 * @group Editor
 * @description List the possibilities of interactions
 */
declare enum Intention {
    Write = "write",
    Erase = "erase",
    /**
     * @remarks only usable in the case of offscreen
     */
    Select = "select",
    /**
     * @remarks only usable in the case of offscreen
     */
    Move = "move"
}
/**
 * @group Editor
 * @description List all the shapes that can be drawn
 * @remarks only usable in the case of offscreen
 */
declare enum WriteTool {
    Pencil = "pencil",
    Rectangle = "rectangle",
    Rhombus = "rhombus",
    Circle = "circle",
    Ellipse = "ellipse",
    Triangle = "triangle",
    Parallelogram = "parallelogram",
    Line = "line",
    Arrow = "arrow",
    DoubleArrow = "double-arrow"
}
/**
 * @group Renderer
 * @description List all svg elements roles
 * @remarks only usable in the case of offscreen
 */
declare enum SvgElementRole {
    Guide = "guide",
    InteractElementsGroup = "interact-elements-group",
    Translate = "translate",
    Resize = "resize",
    Rotate = "rotate"
}
/**
 * @group Renderer
 * @description List all svg elements resize direction
 * @remarks only usable in the case of offscreen
 */
declare const enum ResizeDirection {
    North = "n-resize",
    East = "e-resize",
    South = "s-resize",
    West = "w-resize",
    NorthEast = "ne-resize",
    NorthWest = "nw-resize",
    SouthEast = "se-resize",
    SouthWest = "sw-resize"
}
/**
 * @group Renderer
 */
declare const SELECTION_MARGIN: 10;

/**
 * @group Utils
 */
declare class DeferredPromise<T> {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (value: Error | string) => void;
    isFullFilled: boolean;
    isPending: boolean;
    constructor();
}

/**
 * @group Style
 * @property {String} color=#000000 Color (supported formats rgb() rgba() hsl() hsla() #rgb #rgba #rrggbb #rrggbbaa)
 * @property {String} width in px

 */
type TStyle = {
    width?: number;
    color?: string;
    opacity?: number;
    fill?: string;
};
/**
 * @group Style
 */
declare const DefaultStyle: TStyle;

/**
 * @group Style
 * @property {String} -myscript-pen-width=1 Width of strokes and primitives in mm (no other unit is supported yet)
 * @property {String} -myscript-pen-fill-style=none
 * @property {String} -myscript-pen-fill-color=#FFFFFF00 Color filled inside the area delimited by strokes and primitives
 */
type TPenStyle = TStyle & {
    "-myscript-pen-width"?: number;
    "-myscript-pen-fill-style"?: string;
    "-myscript-pen-fill-color"?: string;
};
/**
 * @group Style
 */
declare const DefaultPenStyle: TPenStyle;

/**
 * @group Style
 */
type TThemeMath = {
    "font-family": string;
};
/**
 * @group Style
 */
type TThemeMathSolved = {
    "font-family": string;
    color: string;
};
/**
 * @group Style
 */
type TThemeText = {
    "font-family": string;
    "font-size": number;
};
/**
 * @group Style
 */
type TTheme = {
    ink: TPenStyle;
    ".math": TThemeMath;
    ".math-solved": TThemeMathSolved;
    ".text": TThemeText;
    [key: string]: unknown;
};
/**
 * @group Style
 */
declare const DefaultTheme: TTheme;

/**
 * @group Style
 */
declare const StyleHelper: {
    themeToCSS(json: TTheme): string;
    themeToJSON(style: string): TTheme;
    penStyleToCSS(penStyle: TPenStyle): string;
    penStyleToJSON(penStyleString: string): TPenStyle;
    stringToJSON(style: string): {
        [key: string]: string;
    };
    JSONToString(style: {
        [key: string]: string;
    }): string;
};

/**
 * @group Style
 */
declare class StyleManager {
    #private;
    constructor(penStyle?: PartialDeep<TPenStyle>, theme?: PartialDeep<TTheme>);
    get currentPenStyle(): TPenStyle;
    get penStyle(): TPenStyle;
    setPenStyle(style?: PartialDeep<TPenStyle>): void;
    get theme(): TTheme;
    setTheme(theme?: PartialDeep<TTheme>): void;
    get penStyleClasses(): string;
    setPenStyleClasses(penStyleClass?: string): void;
}

/**
 * @group Primitive
 */
type TPoint = {
    x: number;
    y: number;
};
/**
 * @group Primitive
 */
type TPointer = TPoint & {
    t: number;
    p: number;
};
/**
 * @group Primitive
 */
type TSegment = {
    p1: TPoint;
    p2: TPoint;
};
/**
 * @group Primitive
 */
declare function isValidPoint(p?: PartialDeep<TPoint>): boolean;

/**
 * @group Primitive
 */
type TBoundingBox = {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * @group Primitive
 */
type TBox = {
    x: number;
    y: number;
    width: number;
    height: number;
    xMin: number;
    xMid: number;
    xMax: number;
    yMin: number;
    yMid: number;
    yMax: number;
};
/**
 * @group Primitive
 */
declare class Box implements TBox {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(boundindBox: TBoundingBox);
    static createFromBoxes(boxes: TBoundingBox[]): Box;
    static createFromPoints(points: TPoint[]): Box;
    static getCorners(box: TBoundingBox): TPoint[];
    static getCenter(box: TBoundingBox): TPoint;
    static getSides(box: TBoundingBox): TSegment[];
    static isContained(box: TBoundingBox, wrapper: TBoundingBox): boolean;
    static containsPoint(box: TBoundingBox, point: TPoint): boolean;
    static contains(box: TBoundingBox, child: TBoundingBox): boolean;
    static overlaps(box1: TBoundingBox, box2: TBoundingBox): boolean;
    get xMin(): number;
    get xMid(): number;
    get xMax(): number;
    get yMin(): number;
    get yMid(): number;
    get yMax(): number;
    get corners(): TPoint[];
    get center(): TPoint;
    get snapPoints(): TPoint[];
    isContained(wrapper: TBoundingBox): boolean;
    contains(child: TBoundingBox): boolean;
    containsPoint(point: TPoint): boolean;
    overlaps(boundaries: TBoundingBox): boolean;
}

/**
 * @group Primitive
 */
declare enum SymbolType {
    Stroke = "stroke",
    Group = "group",
    Shape = "shape",
    Edge = "edge",
    Text = "text",
    Eraser = "eraser"
}
/**
 * @group Primitive
 */
interface TSymbol {
    id: string;
    creationTime: number;
    modificationDate: number;
    type: string;
    style: TStyle;
}

/**
 * @group Transform
 * @remarks Represents a 2D affine transform, defined as a 3x3 matrix with an implicit third raw of <code>[ 0 0 1 ]</code>
 */
type TMatrixTransform = {
    /**
     * @remarks scaling x
     */
    xx: number;
    /**
     * @remarks shearing x
     */
    yx: number;
    /**
     * @remarks translation x
     */
    tx: number;
    /**
     * @remarks shearing y
     */
    xy: number;
    /**
     * @remarks scaling y
     */
    yy: number;
    /**
     * @remarks translation y
     */
    ty: number;
};
/**
 * @group Transform
 * @remarks Represents a 2D affine transform, defined as a 3x3 matrix with an implicit third raw of <code>[ 0 0 1 ]</code>
 */
declare class MatrixTransform implements TMatrixTransform {
    xx: number;
    yx: number;
    xy: number;
    yy: number;
    tx: number;
    ty: number;
    constructor(xx: number, yx: number, xy: number, yy: number, tx: number, ty: number);
    static identity(): MatrixTransform;
    static applyToPoint(mat: TMatrixTransform, point: TPoint): TPoint;
    static rotation(mat: TMatrixTransform): number;
    static toCssString(matrix: TMatrixTransform): string;
    invert(): this;
    multiply(m: TMatrixTransform): MatrixTransform;
    translate(tx: number, ty: number): MatrixTransform;
    rotate(radian: number, center?: TPoint): MatrixTransform;
    scale(x: number, y: number, center?: TPoint): MatrixTransform;
    applyToPoint(point: TPoint): TPoint;
    clone(): MatrixTransform;
    toCssString(): string;
}

/**
 * @group Primitive
 */
declare abstract class OISymbolBase<T extends string = SymbolType> implements TSymbol {
    readonly type: T;
    abstract readonly isClosed: boolean;
    style: TStyle;
    id: string;
    creationTime: number;
    modificationDate: number;
    selected: boolean;
    deleting: boolean;
    transform: MatrixTransform;
    constructor(type: T, style?: PartialDeep<TStyle>);
    abstract get vertices(): TPoint[];
    abstract get snapPoints(): TPoint[];
    get edges(): TSegment[];
    abstract overlaps(box: TBoundingBox): boolean;
    abstract clone(): OISymbolBase;
    abstract toJSON(): PartialDeep<OISymbolBase>;
    isIntersected(seg: TSegment): boolean;
}

/**
 * @group Primitive
 */
declare enum EdgeKind {
    Line = "line",
    PolyEdge = "polyedge",
    Arc = "arc"
}
/**
 * @group Primitive
 */
declare enum EdgeDecoration {
    Arrow = "arrow-head"
}
/**
 * @group Primitive
 */
declare abstract class OIEdgeBase<K = EdgeKind> extends OISymbolBase<SymbolType.Edge> {
    readonly kind: K;
    readonly isClosed = false;
    startDecoration?: EdgeDecoration;
    endDecoration?: EdgeDecoration;
    constructor(kind: K, startDecoration?: EdgeDecoration, endDecoration?: EdgeDecoration, style?: PartialDeep<TStyle>);
    abstract get vertices(): TPoint[];
    get bounds(): Box;
    get snapPoints(): TPoint[];
    overlaps(box: TBoundingBox): boolean;
    abstract clone(): OIEdgeBase;
}

/**
 * @group Primitive
 */
declare class OIEdgeArc extends OIEdgeBase<EdgeKind.Arc> {
    center: TPoint;
    startAngle: number;
    sweepAngle: number;
    radiusX: number;
    radiusY: number;
    phi: number;
    protected _vertices: Map<string, TPoint[]>;
    constructor(center: TPoint, startAngle: number, sweepAngle: number, radiusX: number, radiusY: number, phi: number, startDecoration?: EdgeDecoration, endDecoration?: EdgeDecoration, style?: PartialDeep<TStyle>);
    protected get verticesId(): string;
    protected computedVertices(): TPoint[];
    get vertices(): TPoint[];
    get snapPoints(): TPoint[];
    clone(): OIEdgeArc;
    toJSON(): PartialDeep<OIEdgeArc>;
    static create(partial: PartialDeep<OIEdgeArc>): OIEdgeArc;
}

/**
 * @group Primitive
 */
declare class OIEdgeLine extends OIEdgeBase<EdgeKind.Line> {
    start: TPoint;
    end: TPoint;
    constructor(start: TPoint, end: TPoint, startDecoration?: EdgeDecoration, endDecoration?: EdgeDecoration, style?: PartialDeep<TStyle>);
    get vertices(): TPoint[];
    clone(): OIEdgeLine;
    toJSON(): PartialDeep<OIEdgeLine>;
    static create(partial: PartialDeep<OIEdgeLine>): OIEdgeLine;
}

/**
 * @group Primitive
 */
declare class OIEdgePolyLine extends OIEdgeBase<EdgeKind.PolyEdge> {
    points: TPoint[];
    constructor(points: TPoint[], startDecoration?: EdgeDecoration, endDecoration?: EdgeDecoration, style?: PartialDeep<TStyle>);
    get vertices(): TPoint[];
    clone(): OIEdgePolyLine;
    toJSON(): PartialDeep<OIEdgePolyLine>;
    static create(partial: PartialDeep<OIEdgePolyLine>): OIEdgePolyLine;
}

/**
 * @group Primitive
 */
declare enum ShapeKind {
    Circle = "circle",
    Ellipse = "ellipse",
    Polygon = "polygon",
    Table = "table"
}
/**
 * @group Primitive
 */
declare abstract class OIShapeBase<K = ShapeKind> extends OISymbolBase<SymbolType.Shape> {
    readonly kind: K;
    readonly isClosed = true;
    constructor(kind: K, style?: PartialDeep<TStyle>);
    get bounds(): Box;
    get snapPoints(): TPoint[];
    overlaps(box: TBoundingBox): boolean;
}

/**
 * @group Primitive
 */
declare class OIShapeCircle extends OIShapeBase<ShapeKind.Circle> {
    center: TPoint;
    radius: number;
    protected _vertices: Map<string, TPoint[]>;
    protected _bounds: Map<string, Box>;
    constructor(center: TPoint, radius: number, style?: PartialDeep<TStyle>);
    protected get verticesId(): string;
    protected computedVertices(): TPoint[];
    protected computedBondingBox(): Box;
    get bounds(): Box;
    get vertices(): TPoint[];
    overlaps(box: TBoundingBox): boolean;
    clone(): OIShapeCircle;
    toJSON(): PartialDeep<OIShapeCircle>;
    static createBetweenPoints(origin: TPoint, target: TPoint, style?: PartialDeep<TStyle>): OIShapeCircle;
    static updateBetweenPoints(circle: OIShapeCircle, origin: TPoint, target: TPoint): OIShapeCircle;
    static create(partial: PartialDeep<OIShapeCircle>): OIShapeCircle;
}

/**
 * @group Primitive
 */
declare class OIShapeEllipse extends OIShapeBase<ShapeKind.Ellipse> {
    center: TPoint;
    radiusX: number;
    radiusY: number;
    orientation: number;
    protected _vertices: Map<string, TPoint[]>;
    constructor(center: TPoint, radiusX: number, radiusY: number, orientation: number, style?: PartialDeep<TStyle>);
    protected get verticesId(): string;
    protected computedVertices(): TPoint[];
    get vertices(): TPoint[];
    overlaps(box: TBoundingBox): boolean;
    clone(): OIShapeEllipse;
    toJSON(): PartialDeep<OIShapeEllipse>;
    static createBetweenPoints(origin: TPoint, target: TPoint, style?: PartialDeep<TStyle>): OIShapeEllipse;
    static updateBetweenPoints(ellipse: OIShapeEllipse, origin: TPoint, target: TPoint): OIShapeEllipse;
    static create(partial: PartialDeep<OIShapeEllipse>): OIShapeEllipse;
}

/**
 * @group Primitive
 */
declare class OIShapePolygon extends OIShapeBase<ShapeKind.Polygon> {
    points: TPoint[];
    constructor(points: TPoint[], style?: PartialDeep<TStyle>);
    get vertices(): TPoint[];
    get bounds(): Box;
    clone(): OIShapePolygon;
    toJSON(): PartialDeep<OIShapePolygon>;
    static create(partial: PartialDeep<OIShapePolygon>): OIShapePolygon;
    static createTriangleBetweenPoints(origin: TPoint, target: TPoint, style?: PartialDeep<TStyle>): OIShapePolygon;
    static updateTriangleBetweenPoints(poly: OIShapePolygon, origin: TPoint, target: TPoint): OIShapePolygon;
    static createParallelogramBetweenPoints(origin: TPoint, target: TPoint, style?: PartialDeep<TStyle>): OIShapePolygon;
    static updateParallelogramBetweenPoints(poly: OIShapePolygon, origin: TPoint, target: TPoint): OIShapePolygon;
    static createRectangleBetweenPoints(origin: TPoint, target: TPoint, style?: PartialDeep<TStyle>): OIShapePolygon;
    static updateRectangleBetweenPoints(poly: OIShapePolygon, origin: TPoint, target: TPoint): OIShapePolygon;
    static createRhombusBetweenPoints(origin: TPoint, target: TPoint, style?: PartialDeep<TStyle>): OIShapePolygon;
    static updateRhombusBetweenPoints(poly: OIShapePolygon, origin: TPoint, target: TPoint): OIShapePolygon;
}

/**
 * @group Primitive
 */
type TStrokeToSend = {
    id: string;
    pointerType: string;
    x: number[];
    y: number[];
    t: number[];
    p: number[];
};
/**
 * @group Primitive
 */
type TStrokeGroupToSend = {
    penStyle?: string;
    strokes: TStrokeToSend[];
};
/**
 * @group Primitive
 */
type TStroke = TSymbol & {
    pointerType: string;
    pointers: TPointer[];
    length: number;
};
/**
 * @group Primitive
 */
type TStrokeGroup = {
    penStyle: TPenStyle;
    strokes: Stroke[];
};
/**
 * @group Primitive
 */
declare class Stroke implements TStroke {
    type: SymbolType;
    id: string;
    creationTime: number;
    modificationDate: number;
    style: TPenStyle;
    pointerType: string;
    pointers: TPointer[];
    length: number;
    constructor(style: TPenStyle, pointerType?: string);
    clone(): Stroke;
    formatToSend(): TStrokeToSend;
}
/**
 * @group Primitive
 * @group Utils
 */
declare function convertPartialStrokesToStrokes(json: PartialDeep<TStroke>[]): Stroke[];

/**
 * @group Primitive
 */
declare enum DecoratorKind {
    Highlight = "highlight",
    Surround = "surround",
    Underline = "underline",
    Strikethrough = "strikethrough"
}
/**
 * @group Primitive
 */
declare class OIDecorator {
    id: string;
    kind: DecoratorKind;
    style: TStyle;
    constructor(kind: DecoratorKind, style: TStyle);
    clone(): OIDecorator;
}

/**
 * @group Primitive
 */
declare class OIStroke extends OISymbolBase<SymbolType.Stroke> {
    readonly isClosed = false;
    pointerType: string;
    length: number;
    decorators: OIDecorator[];
    pointers: Array<TPointer>;
    constructor(style?: PartialDeep<TStyle>, pointerType?: string);
    get bounds(): Box;
    static split(strokeToSplit: OIStroke, i: number): {
        before: OIStroke;
        after: OIStroke;
    };
    static substract(stroke: OIStroke, partStroke: OIStroke): {
        before?: OIStroke;
        after?: OIStroke;
    };
    get snapPoints(): TPoint[];
    get vertices(): TPoint[];
    protected computePressure(distance: number): number;
    protected filterPointByAcquisitionDelta(point: TPointer): boolean;
    addPointer(pointer: TPointer): void;
    overlaps(box: TBoundingBox): boolean;
    clone(): OIStroke;
    formatToSend(): TStrokeToSend;
    toJSON(): PartialDeep<OIStroke>;
    static create(partial: PartialDeep<OIStroke>): OIStroke;
}
/**
 * @group Primitive
 * @group Utils
 */
declare function convertPartialStrokesToOIStrokes(json: PartialDeep<TStroke>[]): OIStroke[];

/**
 * @group Primitive
 */
declare class OISymbolGroup extends OISymbolBase<SymbolType.Group> {
    readonly isClosed = false;
    children: TOISymbol[];
    decorators: OIDecorator[];
    constructor(children: TOISymbol[], style?: PartialDeep<TStyle>);
    get snapPoints(): TPoint[];
    get vertices(): TPoint[];
    get bounds(): Box;
    updateChildrenStyle(): void;
    overlaps(box: TBoundingBox): boolean;
    containsSymbol(strokeId: string): boolean;
    containsOnlyStroke(): boolean;
    extractSymbols(): TOISymbol[];
    extractStrokes(): OIStroke[];
    removeChilds(symbolIds: string[]): OISymbolGroup;
    static containsOnlyStroke(group: OISymbolGroup): boolean;
    static extractSymbols(group: OISymbolGroup): TOISymbol[];
    static extractStrokes(group: OISymbolGroup): OIStroke[];
    static containsSymbol(group: OISymbolGroup, symbolId: string): boolean;
    static removeChilds(group: OISymbolGroup, symbolIds: string[]): OISymbolGroup;
    clone(): OISymbolGroup;
    toJSON(): PartialDeep<OISymbolGroup>;
}

/**
 * @group Primitive
 */
type TOISymbolChar = {
    id: string;
    label: string;
    fontSize: number;
    fontWeight: "normal" | "bold";
    color: string;
    bounds: TBoundingBox;
};
/**
 * @group Primitive
 */
declare class OIText extends OISymbolBase<SymbolType.Text> {
    readonly isClosed = true;
    point: TPoint;
    chars: TOISymbolChar[];
    decorators: OIDecorator[];
    bounds: Box;
    rotation?: {
        degree: number;
        center: TPoint;
    };
    constructor(chars: TOISymbolChar[], point: TPoint, bounds: TBoundingBox, style?: PartialDeep<TStyle>);
    get label(): string;
    get vertices(): TPoint[];
    get snapPoints(): TPoint[];
    protected getCharCorners(char: TOISymbolChar): TPoint[];
    getCharsOverlaps(points: TPoint[]): TOISymbolChar[];
    overlaps(box: TBoundingBox): boolean;
    clone(): OIText;
    toJSON(): PartialDeep<OIText>;
    static create(partial: PartialDeep<OIText>): OIText;
}

/**
 * @group Primitive
 */
type TCanvasShapeEllipseSymbol = TSymbol & {
    centerPoint: TPoint;
    maxRadius: number;
    minRadius: number;
    orientation: number;
    startAngle: number;
    sweepAngle: number;
    beginDecoration?: string;
    endDecoration?: string;
    beginTangentAngle: number;
    endTangentAngle: number;
};
/**
 * @group Primitive
 */
type TCanvasShapeLineSymbol = TSymbol & {
    firstPoint: TPoint;
    lastPoint: TPoint;
    beginDecoration?: string;
    endDecoration?: string;
    beginTangentAngle: number;
    endTangentAngle: number;
};
/**
 * @group Primitive
 */
type TCanvasShapeTableLineSymbol = {
    p1: TPoint;
    p2: TPoint;
};
/**
 * @group Primitive
 */
type TCanvasShapeTableSymbol = TSymbol & {
    lines: TCanvasShapeTableLineSymbol[];
};
/**
 * @group Primitive
 */
type TCanvasUnderLineSymbol = TSymbol & {
    data: {
        firstCharacter: number;
        lastCharacter: number;
    };
};
/**
 * @group Primitive
 */
type TCanvasTextSymbol = TSymbol & {
    label: string;
    data: {
        topLeftPoint: TPoint;
        height: number;
        width: number;
        textHeight: number;
        justificationType: string;
    };
};
/**
 * @group Primitive
 */
type TCanvasTextUnderlineSymbol = TCanvasTextSymbol & {
    underlineList: TCanvasUnderLineSymbol[];
};

/**
 * @group Primitive
 */
declare class OIEraser extends OISymbolBase<SymbolType.Eraser> {
    readonly isClosed = false;
    pointers: TPointer[];
    constructor();
    get bounds(): Box;
    get vertices(): TPoint[];
    get snapPoints(): TPoint[];
    clone(): OISymbolBase;
    overlaps(box: TBoundingBox): boolean;
    toJSON(): PartialDeep<OIEraser>;
}

/**
 * @group Primitive
 */
type TOIEdge = OIEdgeArc | OIEdgeLine | OIEdgePolyLine;
/**
 * @group Primitive
 */
type TOIShape = OIShapeCircle | OIShapeEllipse | OIShapePolygon;
/**
 * @group Primitive
 */
type TOISymbol = TOIEdge | TOIShape | OIStroke | OISymbolGroup | OIText;

/**
 * @group Utils
 */
declare function computeDistance(p1: TPoint, p2: TPoint): number;
/**
 * @group Utils
 */
declare function computeAngleAxeRadian(begin: TPoint, end: TPoint): number;
/**
 * @group Utils
 */
declare function createPointsOnSegment(p1: TPoint, p2: TPoint, spaceBetweenPoint?: number): TPoint[];
/**
 * @group Utils
 */
declare function scalaire(v1: TPoint, v2: TPoint): number;
/**
 * @group Utils
 */
declare function computeNearestPointOnSegment(p: TPoint, seg: TSegment): TPoint;
/**
 * @group Utils
 */
declare function isPointInsideBox(point: TPoint, box: TBoundingBox): boolean;
/**
 * @group Utils
 */
declare function convertRadianToDegree(radian: number): number;
/**
 * @group Utils
 */
declare function convertDegreeToRadian(degree: number): number;
/**
 * @group Utils
 */
declare function computeRotatedPoint(point: TPoint, center: TPoint, radian: number): TPoint;
/**
 * @group Utils
 */
declare function computePointOnEllipse(center: TPoint, radiusX: number, radiusY: number, phi: number, theta: number): TPoint;
/**
 * @group Utils
 */
declare function computeDistanceBetweenPointAndSegment(p: TPoint, seg: TSegment): number;
/**
 * @group Utils
 */
declare function findIntersectionBetween2Segment(seg1: TSegment, seg2: TSegment): TPoint | undefined;
/**
 * @group Utils
 */
declare function findIntersectBetweenSegmentAndCircle(seg: TSegment, c: TPoint, r: number): TPoint[];
/**
 * @group Utils
 */
declare function computeAngleRadian(p1: TPoint, center: TPoint, p2: TPoint): number;
/**
 * @group Utils
 */
declare function getClosestPoints(points1: TPoint[], points2: TPoint[]): {
    p1: TPoint;
    p2: TPoint;
};
/**
 * @group Utils
 */
declare function getClosestPoint(points: TPoint[], point: TPoint): {
    point?: TPoint;
    index: number;
};
/**
 * @group Utils
 */
declare function isPointInsidePolygon(point: TPoint, points: TPoint[]): boolean;

/**
 * @group Utils
 */
declare const isVersionSuperiorOrEqual: (source: string, target: string) => boolean;

/**
 * @group Utils
 */
declare function computeHmac(message: string, applicationKey: string, hmacKey: string): Promise<string>;

/**
 * @group Utils
 */
declare function convertMillimeterToPixel(mm: number): number;
/**
 * @group Utils
 */
declare function convertPixelToMillimeter(px: number): number;
/**
 * @group Utils
 */
declare function convertBoundingBoxMillimeterToPixel(box?: TBoundingBox): TBoundingBox;

/**
 * @group Utils
 */
declare function createUUID(): string;

/**
 * @group Utils
 */
declare function isValidNumber(x: unknown): boolean;
/**
 * @group Utils
 */
declare function isBetween(val: number, min: number, max: number): boolean;
/**
 * @group Utils
 */
declare function computeAverage(arr: number[]): number;

/**
 * @group Utils
 */
declare const mergeDeep: (target: any, ...sources: any[]) => any;

/**
 * @group Utils
 */
type PartialDeep<T> = T extends object ? {
    [P in keyof T]?: PartialDeep<T[P]>;
} : T;

/**
 * @group Utils
 */
declare function getAvailableFontList(configuration: PartialDeep<TConfiguration>): Promise<Array<string>>;

/**
 * @group Utils
 */
declare function getAvailableLanguageList(configuration: PartialDeep<TConfiguration>): Promise<{
    result: {
        [key: string]: string;
    };
}>;

/**
 * @group Utils
 */
declare function computeLinksPointers(point: TPointer, angle: number, width: number): TPoint[];
/**
 * @group Utils
 */
declare function computeMiddlePointer(point1: TPointer, point2: TPointer): TPointer;

/**
 * @group Configuration
 */
type TListenerConfiguration = {
    capture: boolean;
    passive: boolean;
};
/**
 * @group Configuration
 */
declare const DefaultListenerConfiguration: TListenerConfiguration;
/**
 * @group Configuration
 */
type TGrabberConfiguration = {
    listenerOptions: TListenerConfiguration;
    xyFloatPrecision: number;
    timestampFloatPrecision: number;
    delayLongTouch: number;
};
/**
 * @group Configuration
 */
declare const DefaultGrabberConfiguration: TGrabberConfiguration;

/**
 * @group Configuration
 * @remarks only usable in the case of offscreen
 */
type TMenuConfiguration = {
    enable: boolean;
    style: {
        enable: boolean;
    };
    intention: {
        enable: boolean;
    };
    action: {
        enable: boolean;
    };
    context: {
        enable: boolean;
    };
};
/**
 * @group Configuration
 * @remarks only usable in the case of offscreen
 */
declare const DefaultMenuConfiguration: TMenuConfiguration;

/**
 * @group Configuration
 */
type TEraserConfiguration = {
    "erase-precisely": boolean;
};
/**
 * @group Configuration
 */
declare const DefaultEraserConfiguration: TEraserConfiguration;

/**
 * @group Configuration
 */
type TMarginConfiguration = {
    bottom: number;
    left: number;
    right: number;
    top: number;
};
/**
 * @group Configuration
 */
declare const DefaultMarginConfiguration: TMarginConfiguration;

/**
 * @group Configuration
 */
type TTextGuidesConfiguration = {
    enable: boolean;
};
/**
 * @group Configuration
 */
declare const DefaultTextGuidesConfiguration: TTextGuidesConfiguration;
/**
 * @group Configuration
 */
type TTextConfConfiguration = {
    customResources?: string[];
    customLexicon?: string[];
    addLKText?: boolean;
};
/**
 * @group Configuration
 */
type TTextConfiguration = {
    text?: boolean;
    mimeTypes: ("text/plain" | "application/vnd.myscript.jiix")[];
    margin: TMarginConfiguration;
    guides?: TTextGuidesConfiguration;
    configuration?: TTextConfConfiguration;
    eraser?: TEraserConfiguration;
};
/**
 * @group Configuration
 */
declare const DefaultTextConfiguration: TTextConfiguration;

/**
 * @group Configuration
 */
type TDiagramConvertConfiguration = {
    types?: ("text" | "shape")[];
    "match-text-size"?: boolean;
};
/**
 * @group Configuration
 */
type TDiagramConfiguration = {
    mimeTypes: ("application/vnd.myscript.jiix" | "application/vnd.openxmlformats-officedocument.presentationml.presentation" | "image/svg+xml")[];
    "enable-sub-blocks"?: boolean;
    text?: TTextConfConfiguration;
    convert?: TDiagramConvertConfiguration;
    "session-time"?: number;
    eraser?: TEraserConfiguration;
};
/**
 * @group Configuration
 */
declare const DefaultDiagramConvertConfiguration: TDiagramConvertConfiguration;
/**
 * @group Configuration
 */
declare const DefaultDiagramConfiguration: TDiagramConfiguration;

/**
 * @group Configuration
 */
type TImageViewportConfiguration = {
    x: number;
    y: number;
    width: number;
    height: number;
};
/**
 * @group Configuration
 */
type TImageConfiguration = {
    guides: boolean;
    viewport: TImageViewportConfiguration;
};
/**
 * @group Configuration
 */
type TJiixConfiguration = {
    "bounding-box": boolean;
    strokes: boolean;
    ids: boolean;
    "full-stroke-ids": boolean;
    text: {
        chars: boolean;
        words: boolean;
    };
    style?: boolean;
};
/**
 * @group Configuration
 */
declare const DefaultJiixConfiguration: TJiixConfiguration;
/**
 * @group Configuration
 */
type TMathMLFlavor = {
    name: string;
};
/**
 * @group Configuration
 */
type TMathMLExport = {
    flavor: TMathMLFlavor;
};
/**
 * @group Configuration
 */
type TExportConfiguration = {
    "image-resolution"?: number;
    image?: TImageConfiguration;
    jiix: TJiixConfiguration;
    mathml?: TMathMLExport;
};
/**
 * @group Configuration
 */
declare const DefaultExportConfiguration: TExportConfiguration;

/**
 * @group Configuration
 */
type TRoundingMode = "half up" | "truncate";
/**
 * @group Configuration
 */
type TAngleUnit = "deg" | "rad";
/**
 * @group Configuration
 */
type TSolverOptions = "algebraic" | "numeric";
/**
 * @group Configuration
 */
type TSolverConfiguration = {
    enable?: boolean;
    "fractional-part-digits"?: number;
    "decimal-separator"?: string;
    "rounding-mode"?: TRoundingMode;
    "angle-unit"?: TAngleUnit;
    options?: TSolverOptions;
};
/**
 * @group Configuration
 */
declare const DefaultSolverConfiguration: TSolverConfiguration;
/**
 * @group Configuration
 */
type TUndoRedoMode = "stroke" | "session";
/**
 * @group Configuration
 */
type TMathUndoRedoConfiguration = {
    mode: TUndoRedoMode;
};
/**
 * @group Configuration
 */
declare const DefaultMathUndoRedoConfiguration: TMathUndoRedoConfiguration;
/**
 * @group Configuration
 */
type TMathConfiguration = {
    mimeTypes: ("application/x-latex" | "application/mathml+xml" | "application/vnd.myscript.jiix")[];
    solver?: TSolverConfiguration;
    margin: TMarginConfiguration;
    "undo-redo"?: TMathUndoRedoConfiguration;
    customGrammar?: string;
    customGrammarId?: string;
    customGrammarContent?: string;
    eraser?: TEraserConfiguration;
    "session-time"?: number;
    "recognition-timeout"?: number;
};
/**
 * @group Configuration
 */
declare const DefaultMathConfiguration: TMathConfiguration;

/**
 * @group Configuration
 */
type TRawContentConfiguration = {
    text?: TTextConfConfiguration;
    "session-time"?: number;
    recognition?: {
        types: ("text" | "shape")[];
    };
    eraser?: TEraserConfiguration;
    /**
     * @description allows you to define the detected gestures
     * @remarks only usable in the case of offscreen
     */
    gestures?: ("underline" | "scratch-out" | "join" | "insert" | "strike-through" | "surround")[];
};
/**
 * @group Configuration
 */
declare const DefaultRawContentConfiguration: TRawContentConfiguration;

/**
 * @group Configuration
 */
type TRecognitionRendererDebugConfiguration = {
    "draw-text-boxes": boolean;
    "draw-image-boxes": boolean;
};
/**
 * @group Configuration
 */
declare const DefaultDebugConfiguration: TRecognitionRendererDebugConfiguration;
/**
 * @group Configuration
 */
type TRecognitionRendererConfiguration = {
    debug: TRecognitionRendererDebugConfiguration;
};
/**
 * @group Configuration
 */
declare const DefaultRecognitionRendererConfiguration: TRecognitionRendererConfiguration;

/**
 * @group Configuration
 */
type TConvertionConfiguration = {
    force?: {
        "on-stylesheet-change": boolean;
    };
};
/**
 * @group Configuration
 */
declare const DefaultConvertionConfiguration: TConvertionConfiguration;

/**
 * @group Configuration
 */
type TRecognitionType = "TEXT" | "MATH" | "DIAGRAM" | "Raw Content";
/**
 * @group Configuration
 */
type TConverstionState = "DIGITAL_EDIT" | "HANDWRITING";
/**
 * @group Configuration
 */
type TRecognitionConfiguration = {
    type: TRecognitionType;
    alwaysConnected: boolean;
    lang: string;
    math: TMathConfiguration;
    text: TTextConfiguration;
    diagram: TDiagramConfiguration;
    renderer: TRecognitionRendererConfiguration;
    export: TExportConfiguration;
    "raw-content": TRawContentConfiguration;
    gesture: {
        enable: boolean;
        ignoreGestureStrokes: boolean;
    };
    convert: TConvertionConfiguration;
};
/**
 * @group Configuration
 */
declare const DefaultRecognitionConfiguration: TRecognitionConfiguration;

/**
 * @group Configuration
 */
type TGuidesConfiguration = {
    enable: boolean;
    gap: number;
    /**
     * @remarks only usable in the case of offscreen
     */
    type: "line" | "grid" | "point";
};
/**
 * @group Configuration
 */
declare const DefaultGuidesConfiguration: TGuidesConfiguration;
/**
 * @group Configuration
 */
type TSmartGuidesConfiguration = {
    enable: boolean;
};
/**
 * @group Configuration
 */
declare const DefaultSmartGuidesConfiguration: TSmartGuidesConfiguration;
/**
 * @group Configuration
 */
type TRenderingConfiguration = {
    minHeight: number;
    minWidth: number;
    smartGuide: TSmartGuidesConfiguration;
    guides: TGuidesConfiguration;
};
/**
 * @group Configuration
 */
declare const DefaultRenderingConfiguration: TRenderingConfiguration;

/**
 * @group Configuration
 */
type TProtocol = "WEBSOCKET" | "REST";
/**
 * @group Configuration
 */
type TSchene = "https" | "http";
/**
 * @group Configuration
 */
type TServerConfiguration = {
    protocol: TProtocol;
    scheme: TSchene;
    host: string;
    applicationKey: string;
    hmacKey: string;
    version: string;
    useWindowLocation?: boolean;
    websocket: {
        pingEnabled: boolean;
        pingDelay: number;
        maxPingLostCount: number;
        autoReconnect: boolean;
        maxRetryCount: number;
        fileChunkSize: number;
    };
};
/**
 * @group Configuration
 */
declare const DefaultServerConfiguration: TServerConfiguration;

/**
 * @group Configuration
 * @remarks
 * Configure when the action is triggered.
 *
 * POINTER_UP :   Action is triggered on every PenUP.
 *                This is the recommended mode for CDK V3 WebSocket recognitions.
 *
 * QUIET_PERIOD : Action is triggered after a quiet period in milli-seconds on every pointer up.
 *                The value is set to 1000 for example recognition will be triggered when the user stops writing for 1 seconds.
 *                This is the recommended mode for all REST discoveries.
 *
 * DEMAND :       Action is triggered on external demande
 */
type TTriggerConfiguration = {
    exportContent: "QUIET_PERIOD" | "POINTER_UP" | "DEMAND";
    exportContentDelay: number;
    resizeTriggerDelay: number;
};
/**
 * @group Configuration
 */
declare const DefaultTriggerConfiguration: TTriggerConfiguration;

/**
 * @group Configuration
 */
type TUndoRedoConfiguration = {
    maxStackSize: number;
};
/**
 * @group Configuration
 */
declare const DefaultUndoRedoConfiguration: TUndoRedoConfiguration;

/**
 * @group Configuration
 */
type TConfiguration = {
    offscreen: boolean;
    server: TServerConfiguration;
    recognition: TRecognitionConfiguration;
    grabber: TGrabberConfiguration;
    rendering: TRenderingConfiguration;
    triggers: TTriggerConfiguration;
    "undo-redo": TUndoRedoConfiguration;
    menu: TMenuConfiguration;
};
/**
 * @group Configuration
 */
declare const DefaultConfiguration: TConfiguration;
/**
 * @group Configuration
 */
declare class Configuration implements TConfiguration {
    #private;
    offscreen: boolean;
    grabber: TGrabberConfiguration;
    recognition: TRecognitionConfiguration;
    rendering: TRenderingConfiguration;
    server: TServerConfiguration;
    triggers: TTriggerConfiguration;
    "undo-redo": TUndoRedoConfiguration;
    menu: TMenuConfiguration;
    constructor(configuration?: PartialDeep<TConfiguration>);
    overrideDefaultConfiguration(configuration?: PartialDeep<TConfiguration>): void;
}

/**
 * @group Configuration
 */
type TLoggerConfiguration = {
    [key in keyof typeof LoggerClass]: LoggerLevel;
};
/**
 * @group Configuration
 */
declare const DefaultLoggerConfiguration: TLoggerConfiguration;

/**
 * @group Logger
 */
declare enum LoggerLevel {
    DEBUG = "1",
    INFO = "2",
    WARN = "3",
    ERROR = "4"
}
/**
 * @group Logger
 */
declare enum LoggerClass {
    EDITOR = "EDITOR",
    RECOGNIZER = "RECOGNIZER",
    GRABBER = "GRABBER",
    BEHAVIORS = "BEHAVIORS",
    GESTURE = "GESTURE",
    CONFIGURATION = "CONFIGURATION",
    PUBLIC_EVENT = "PUBLIC_EVENT",
    MODEL = "MODEL",
    RENDERER = "RENDERER",
    SMARTGUIDE = "SMARTGUIDE",
    STYLE = "STYLE",
    HISTORY = "HISTORY",
    SYMBOL = "SYMBOL",
    INTERNAL_EVENT = "INTERNAL_EVENT",
    WRITE = "WRITE",
    TRANSFORMER = "TRANSFORMER",
    CONVERTER = "CONVERTER",
    SELECTION = "SELECTION",
    SVGDEBUG = "SVGDEBUG",
    MENU = "MENU"
}
/**
 * @group Logger
 */
declare class Logger {
    instanceName: LoggerClass;
    level: LoggerLevel;
    constructor(instanceName: LoggerClass, level: LoggerLevel);
    debug(functionName: string, ...data: any): void;
    info(functionName: string, ...data: any): void;
    warn(functionName: string, ...data: any): void;
    error(functionName: string, ...error: any): void;
}

/**
 * @group Logger
 */
declare class LoggerManager {
    #private;
    static getLogger(name: LoggerClass): Logger;
    static setLoggerLevel(config: TLoggerConfiguration): void;
}

/**
 * @group Grabber
 */
interface IGrabber {
    attach(domElement?: HTMLElement): void;
    detach(domElement?: HTMLElement): void;
    onPointerDown(evt: PointerEvent, point: TPointer): void;
    onPointerMove(evt: PointerEvent, point: TPointer): void;
    onPointerUp(evt: PointerEvent, point: TPointer): void;
}

/**
 * @group Grabber
 */
declare class OIPointerEventGrabber implements IGrabber {
    #private;
    protected configuration: TGrabberConfiguration;
    protected domElement: HTMLElement;
    protected activePointerId?: number;
    protected prevent: (e: Event) => void;
    onPointerDown: (evt: PointerEvent, point: TPointer) => void;
    onPointerMove: (evt: PointerEvent, point: TPointer) => void;
    onPointerUp: (evt: PointerEvent, point: TPointer) => void;
    onContextMenu: (el: HTMLElement, point: TPointer) => void;
    constructor(configuration: TGrabberConfiguration);
    protected roundFloat(oneFloat: number, requestedFloatPrecision: number): number;
    protected extractPoint(event: MouseEvent | TouchEvent): TPointer;
    protected pointerDownHandler: (evt: PointerEvent) => void;
    protected pointerMoveHandler: (evt: PointerEvent) => void;
    protected pointerUpHandler: (evt: PointerEvent) => void;
    protected pointerOutHandler: (evt: PointerEvent) => void;
    protected contextMenuHandler: (evt: MouseEvent) => void;
    stopPointerEvent(): void;
    attach(domElement: HTMLElement): void;
    detach(): void;
}

/**
 * @group Grabber
 */
declare class PointerEventGrabber implements IGrabber {
    #private;
    protected configuration: TGrabberConfiguration;
    protected domElement: HTMLElement;
    protected activePointerId?: number;
    protected prevent: (e: Event) => void;
    onPointerDown: (evt: PointerEvent, point: TPointer) => void;
    onPointerMove: (evt: PointerEvent, point: TPointer) => void;
    onPointerUp: (evt: PointerEvent, point: TPointer) => void;
    constructor(configuration: TGrabberConfiguration);
    protected roundFloat(oneFloat: number, requestedFloatPrecision: number): number;
    protected extractPoint(event: MouseEvent | TouchEvent): TPointer;
    protected pointerDownHandler: (evt: PointerEvent) => void;
    protected pointerMoveHandler: (evt: PointerEvent) => void;
    protected pointerUpHandler: (evt: PointerEvent) => void;
    protected pointerOutHandler: (evt: PointerEvent) => void;
    attach(domElement: HTMLElement): void;
    detach(): void;
}

/**
 * @group Exports
 * @description List all supported MIME types for export. Please note, the MIME types supported depend on the recognition type configured
 */
declare enum ExportType {
    JIIX = "application/vnd.myscript.jiix",
    TEXT = "text/plain",
    LATEX = "application/x-latex",
    MATHML = "application/mathml+xml",
    SVG = "image/svg+xml",
    OFFICE_DOCUMENT = "application/vnd.openxmlformats-officedocument.presentationml.presentation"
}
/**
 * @group Exports
 * @remarks {@link https://developer.preprod.myscript.com/docs/interactive-ink/latest/reference/jiix  Element type}
 */
declare enum JIIXELementType {
    Text = "Text",
    Node = "Node",
    Edge = "Edge",
    RawContent = "Raw Content"
}
/**
 * @group Exports
 * @remarks {@link https://developer.preprod.myscript.com/docs/interactive-ink/latest/reference/jiix/#diagram-item-blocks | Element node kind}
 */
declare enum JIIXNodeKind {
    Circle = "circle",
    Ellipse = "ellipse",
    Rectangle = "rectangle",
    Triangle = "triangle",
    Parallelogram = "parallelogram",
    Polygon = "polygon",
    Rhombus = "rhombus"
}
/**
 * @group Exports
 */
declare enum JIIXEdgeKind {
    Line = "line",
    PolyEdge = "polyedge",
    Arc = "arc"
}
/**
 * @group Exports
 * @remarks {@link https://developer.preprod.myscript.com/docs/interactive-ink/latest/reference/jiix/#stroke-item | Stroke item}
 */
type TJIIXStrokeItem = {
    type: "stroke";
    id: string;
    "full-id"?: string;
    timestamp?: string;
    X?: number[];
    Y?: number[];
    F?: number[];
    T?: number[];
};
/**
 * @group Exports
 */
type TJIIXBase = {
    "bounding-box"?: TBoundingBox;
    items?: TJIIXStrokeItem[];
};
/**
 * @group Exports
 */
type TJIIXElementBase<T = string> = TJIIXBase & {
    id: string;
    type: T;
};
/**
 * @group Exports
 * @remarks {@link https://developer.preprod.myscript.com/docs/interactive-ink/latest/reference/jiix/#word-object | Word object}
 */
type TJIIXWord = TJIIXBase & {
    id?: string;
    label: string;
    candidates?: string[];
    "first-char"?: number;
    "last-char"?: number;
};
/**
 * @group Exports
 * @remarks {@link https://developer.preprod.myscript.com/docs/interactive-ink/latest/reference/jiix/#character-object | Character object}
 */
type TJIIXChar = TJIIXBase & {
    label: string;
    candidates?: string[];
    word: number;
    grid: TPoint[];
};
/**
 * @group Exports
 * @remarks {@link https://developer.preprod.myscript.com/docs/interactive-ink/latest/reference/jiix/#text-interpretation | Text Element }
 */
type TJIIXTextElement = TJIIXElementBase<JIIXELementType.Text> & {
    id: string;
    "bounding-box"?: TBoundingBox;
    label: string;
    words?: TJIIXWord[];
    chars?: TJIIXChar[];
};
/**
 * @group Exports
 */
type TJIIXNodeElementBase<K = string> = TJIIXElementBase<JIIXELementType.Node> & {
    id: string;
    kind: K;
};
/**
 * @group Exports
 */
type TJIIXNodeCircle = TJIIXNodeElementBase<JIIXNodeKind.Circle> & {
    id: string;
    cx: number;
    cy: number;
    r: number;
};
/**
 * @group Exports
 */
type TJIIXNodeEllipse = TJIIXNodeElementBase<JIIXNodeKind.Ellipse> & {
    id: string;
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    orientation: number;
};
/**
 * @group Exports
 */
type TJIIXNodeRectangle = TJIIXNodeElementBase<JIIXNodeKind.Rectangle> & {
    id: string;
    height: number;
    width: number;
    x: number;
    y: number;
};
/**
 * @group Exports
 */
type TJIIXNodeTriangle = TJIIXNodeElementBase<JIIXNodeKind.Triangle> & {
    id: string;
    points: number[];
};
/**
 * @group Exports
 */
type TJIIXNodeParrallelogram = TJIIXNodeElementBase<JIIXNodeKind.Parallelogram> & {
    id: string;
    points: number[];
};
/**
 * @group Exports
 */
type TJIIXNodePolygon = TJIIXNodeElementBase<JIIXNodeKind.Polygon> & {
    id: string;
    points: number[];
};
/**
 * @group Exports
 */
type TJIIXNodeRhombus = TJIIXNodeElementBase<JIIXNodeKind.Rhombus> & {
    id: string;
    points: number[];
};
/**
 * @group Exports
 */
type TJIIXNodeElement = TJIIXNodeCircle | TJIIXNodeEllipse | TJIIXNodeRectangle | TJIIXNodeTriangle | TJIIXNodeParrallelogram | TJIIXNodePolygon | TJIIXNodeRhombus;
/**
 * @group Exports
 */
type TJIIXEdgeElementBase<K = string> = TJIIXElementBase<JIIXELementType.Edge> & {
    kind: K;
};
/**
 * @group Exports
 * @remarks {@link https://developer.preprod.myscript.com/docs/interactive-ink/latest/reference/jiix/#line-item | Element line}
 */
type TJIIXEdgeLine = TJIIXEdgeElementBase<JIIXEdgeKind.Line> & {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    p1Decoration?: EdgeDecoration;
    p2Decoration?: EdgeDecoration;
};
/**
 * @group Exports
 */
type TJIIXEdgePolyEdge = TJIIXEdgeElementBase<JIIXEdgeKind.PolyEdge> & {
    edges: TJIIXEdgeLine[];
};
/**
 * @group Exports
 * @remarks {@link https://developer.preprod.myscript.com/docs/interactive-ink/latest/reference/jiix/#arc-item | Element arc}
 */
type TJIIXEdgeArc = TJIIXEdgeElementBase<JIIXEdgeKind.Arc> & {
    cx: number;
    cy: number;
    rx: number;
    ry: number;
    phi: number;
    startAngle: number;
    sweepAngle: number;
    startDecoration?: EdgeDecoration;
    endDecoration?: EdgeDecoration;
};
/**
 * @group Exports
 */
type TJIIXEdgeElement = TJIIXEdgeLine | TJIIXEdgePolyEdge | TJIIXEdgeArc;
/**
 * @group Exports
 * @remarks {@link https://developer.preprod.myscript.com/docs/interactive-ink/latest/reference/web/jiix | Exports}
 */
type TJIIXElement = TJIIXTextElement | TJIIXNodeElement | TJIIXEdgeElement;
/**
 * @group Exports
 */
type TJIIXExport = {
    type: string;
    id: string;
    "bounding-box"?: TBoundingBox;
    version: string;
    elements?: TJIIXElement[];
    label?: string;
    words?: TJIIXWord[];
    chars?: TJIIXChar[];
};
/**
 * @group Exports
 * @remarks
 * List all supported MIME types for export.
 *
 * Attention the MIME types supported depend on the {@link TRecognitionType | type of recognition}
 *
 * {@link https://developer.preprod.myscript.com/docs/interactive-ink/latest/reference/jiix | Documentation}
 */
type TExport = {
    /** @hidden */
    [key: string]: unknown;
    /**
     * @remarks vnd.myscript.jiix is used for text and raw-content exports
     */
    "application/vnd.myscript.jiix"?: TJIIXExport;
    /**
     * @remarks text/plain is only use for text export
     */
    "text/plain"?: string;
    /**
     * @remarks x-latex is only use for math export
     * @see {@link https://katex.org/docs/browser.html | katex} to render
     */
    "application/x-latex"?: string;
    /**
     * @remarks mathml+xml is only use for math export
     * @see {@link https://www.w3.org/Math/whatIsMathML.html | Mathematical Markup Language}
     */
    "application/mathml+xml"?: string;
    /**
     * @remarks svg+xml is only use for diagram export
     */
    "image/svg+xml"?: string;
    /**
     * @remarks vnd.openxmlformats-officedocument.presentationml.presentation is only use for diagram export
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Blob | Blob}
     */
    "application/vnd.openxmlformats-officedocument.presentationml.presentation"?: Blob;
};

/**
 * @group Model
 */
interface IModel {
    readonly creationTime: number;
    modificationDate: number;
    symbols: TSymbol[];
    exports?: TExport;
    converts?: TExport;
    width: number;
    height: number;
    rowHeight: number;
    idle: boolean;
    clone(): IModel;
}

/**
 * @group Model
 */
type TRecognitionPositions = {
    lastSentPosition: number;
    lastReceivedPosition: number;
};
/**
 * @group Model
 */
declare class Model implements IModel {
    #private;
    readonly creationTime: number;
    modificationDate: number;
    positions: TRecognitionPositions;
    currentSymbol?: Stroke;
    symbols: Stroke[];
    exports?: TExport;
    converts?: TExport;
    width: number;
    height: number;
    rowHeight: number;
    idle: boolean;
    constructor(width?: number, height?: number, rowHeight?: number, creationDate?: number);
    protected computePressure(distance: number, globalDistance: number): number;
    protected filterPointByAcquisitionDelta(stroke: Stroke, point: TPointer, lastPointer?: TPointer): boolean;
    getStrokeFromPoint(point: TPoint): Stroke[];
    addPoint(stroke: Stroke, pointer: TPointer): void;
    addStroke(stroke: Stroke): void;
    updateStroke(updatedStroke: Stroke): void;
    removeStroke(id: string): void;
    removeStrokesFromPoint(point: TPoint): string[];
    extractUnsentStrokes(): Stroke[];
    initCurrentStroke(point: TPointer, pointerType: string, style: TPenStyle, dpi?: number): void;
    appendToCurrentStroke(point: TPointer): void;
    endCurrentStroke(point: TPointer): void;
    updatePositionSent(position?: number): void;
    updatePositionReceived(): void;
    mergeExport(exports: TExport): void;
    mergeConvert(converts: TExport): void;
    clone(): Model;
    clear(): void;
}

/**
 * @group Model
 */
declare class OIModel implements IModel {
    #private;
    readonly creationTime: number;
    modificationDate: number;
    currentSymbol?: TOISymbol;
    symbols: TOISymbol[];
    exports?: TExport;
    converts?: TExport;
    width: number;
    height: number;
    rowHeight: number;
    idle: boolean;
    constructor(width?: number, height?: number, rowHeight?: number, creationDate?: number);
    get symbolsSelected(): TOISymbol[];
    get symbolsToDelete(): TOISymbol[];
    selectSymbol(id: string): void;
    unselectSymbol(id: string): void;
    resetSelection(): void;
    getRootSymbol(id: string): TOISymbol | undefined;
    getSymbolRowIndex(symbol: TOISymbol): number;
    getSymbolsByRowOrdered(): {
        rowIndex: number;
        symbols: TOISymbol[];
    }[];
    roundToLineGuide(y: number): number;
    isSymbolAbove(source: TOISymbol, target: TOISymbol): boolean;
    isSymbolInRow(source: TOISymbol, target: TOISymbol): boolean;
    isSymbolBelow(source: TOISymbol, target: TOISymbol): boolean;
    getFirstSymbol(symbols: TOISymbol[]): TOISymbol | undefined;
    getLastSymbol(symbols: TOISymbol[]): TOISymbol | undefined;
    addSymbol(symbol: TOISymbol): void;
    updateSymbol(updatedSymbol: TOISymbol): void;
    replaceSymbol(id: string, symbols: TOISymbol[]): void;
    changeOrderSymbol(id: string, position: "first" | "last" | "forward" | "backward"): void;
    removeSymbol(id: string): void;
    extractDifferenceSymbols(model: OIModel): {
        added: TOISymbol[];
        removed: TOISymbol[];
    };
    mergeExport(exports: TExport): void;
    clone(): OIModel;
    clear(): void;
}

/**
 * @group History
 */
type TUndoRedoContext = {
    canUndo: boolean;
    canRedo: boolean;
    empty: boolean;
    stackIndex: number;
    possibleUndoCount: number;
};
/**
 * @group History
 */
declare const getInitialUndoRedoContext: () => TUndoRedoContext;

/**
 * @group History
 */
interface IHistoryManager {
    context: TUndoRedoContext;
    undo(): unknown;
    redo(): unknown;
}

/**
 * @group Recognizer
 * @remarks List all errors generated by the backend with their descriptions
 */
declare enum RecognizerError {
    NO_ACTIVITY = "Session closed due to no activity. Without a connection on your part, it will be permanently lost after an hour.",
    WRONG_CREDENTIALS = "Application credentials are invalid. Please check or regenerate your application key and hmackey.",
    TOO_OLD = "Session is too old. Max Session Duration Reached.",
    NO_SESSION_FOUND = "No sessions found. Without activation for 1 hour, sessions are deleted from the server. To avoid losing your work, use the json export, then import it this will create a new session.",
    UNKNOW = "An unknown error has occurred.",
    ABNORMAL_CLOSURE = "MyScript recognition server is not reachable.",
    CANT_ESTABLISH = "Unable to establish a connection to MyScript recognition server. Check the host and your connectivity.",
    GOING_AWAY = "MyScript recognition server is going away, either because of a server failure or because the browser is navigating away from the page that opened the connection.",
    PROTOCOL_ERROR = "MyScript recognition server terminated the connection due to a protocol error.",
    UNSUPPORTED_DATA = "MyScript recognition server terminated the connection because the endpoint received data of a type it cannot accept. (For example, a text-only endpoint received binary data.)",
    INVALID_FRAME_PAYLOAD = "MyScript recognition server terminated the connection because a message was received that contained inconsistent data (e.g., non-UTF-8 data within a text message).",
    POLICY_VIOLATION = "MyScript recognition server terminated the connection because it received a message that violates its policy.",
    MESSAGE_TOO_BIG = "MyScript recognition server terminated the connection because a data frame was received that is too large.",
    INTERNAL_ERROR = "MyScript recognition server terminated the connection because it encountered an unexpected condition that prevented it from fulfilling the request.",
    SERVICE_RESTART = "MyScript recognition server terminated the connection because it is restarting.",
    TRY_AGAIN = "MyScript recognition server terminated the connection due to a temporary condition, e.g. it is overloaded and is casting off some of its clients.",
    BAD_GATEWAY = "MyScript recognition server was acting as a gateway or proxy and received an invalid response from the upstream server.",
    TLS_HANDSHAKE = "MyScript recognition server connection was closed due to a failure to perform a TLS handshake"
}

/**
 * @group Gesture
 * @description List all authorized gestures
 */
type TGestureType = "UNDERLINE" | "SCRATCH" | "JOIN" | "INSERT" | "STRIKETHROUGH" | "SURROUND";
/**
 * @group Gesture
 * @remarks
 *  when gestureType = "INSERT", subStrokes represent the two parts
 *  when gestureType = "SCRATCH", subStrokes represent the part to substract at the stroke corresponding fullStrokeId
 */
type TGesture = {
    gestureType: TGestureType;
    gestureStrokeId: string;
    strokeIds: string[];
    strokeBeforeIds: string[];
    strokeAfterIds: string[];
    subStrokes?: {
        fullStrokeId: string;
        x: number[];
        y: number[];
    }[];
};
/**
 * @group Gesture
 * @description List all action allowed on surround detected
 * @remarks only usable in the case of offscreen
 */
declare enum SurroundAction {
    Select = "select",
    Surround = "surround",
    Highlight = "highlight"
}
/**
 * @group Gesture
 * @description List all action allowed on strikeThrough detected
 * @remarks only usable in the case of offscreen
 */
declare enum StrikeThroughAction {
    Erase = "erase",
    Draw = "draw"
}
/**
 * @group Gesture
 * @description List all action allowed on split detected
 * @remarks only usable in the case of offscreen
 */
declare enum InsertAction {
    /**
     * Add lien break on gesture place
     */
    LineBreak = "line-break",
    /**
     * Insert place in gesture place
     */
    Insert = "insert"
}

/**
 * @group Recognizer
 */
declare enum TOIMessageType {
    HMAC_Challenge = "hmacChallenge",
    Authenticated = "authenticated",
    SessionDescription = "sessionDescription",
    NewPart = "newPart",
    PartChanged = "partChanged",
    ContentChanged = "contentChanged",
    Idle = "idle",
    Pong = "pong",
    Exported = "exported",
    GestureDetected = "gestureDetected",
    ContextlessGesture = "contextlessGesture",
    Error = "error"
}
/**
 * @group Recognizer
 * @description use to type message to send to backend
 */
type TOIMessageEvent = {
    type: string;
    [key: string]: unknown;
};
/**
 * @group Recognizer
 */
type TOIMessage<T = string> = {
    type: T;
};
/**
 * @group Recognizer
 */
type TOIMessageEventAuthenticated = TOIMessage<TOIMessageType.Authenticated>;
/**
 * @group Recognizer
 */
type TOIMessageEventHMACChallenge = TOIMessage<TOIMessageType.HMAC_Challenge> & {
    hmacChallenge: string;
    iinkSessionId: string;
};
/**
 * @group Recognizer
 */
type TOISessionDescriptionMessage = TOIMessage<TOIMessageType.SessionDescription> & {
    contentPartCount: number;
    iinkSessionId: string;
};
/**
 * @group Recognizer
 */
type TOIMessageEventNewPart = TOIMessage<TOIMessageType.NewPart> & {
    id: string;
    idx: null;
};
/**
 * @group Recognizer
 */
type TOIMessageEventPartChange = TOIMessage<TOIMessageType.PartChanged> & {
    partIdx: number;
    partId: string;
    partCount: number;
};
/**
 * @group Recognizer
 */
type TOIMessageEventContentChange = TOIMessage<TOIMessageType.ContentChanged> & {
    partId: string;
    canUndo: boolean;
    canRedo: boolean;
    empty: boolean;
    undoStackIndex: number;
    possibleUndoCount: number;
};
/**
 * @group Recognizer
 */
type TOIMessageEventExport = TOIMessage<TOIMessageType.Exported> & {
    partId: string;
    exports: TExport;
};
/**
 * @group Recognizer
 */
type TOIMessageEventGesture = TOIMessage<TOIMessageType.GestureDetected> & TGesture;
/**
 * @group Recognizer
 */
type TOIMessageEventContextlessGesture = TOIMessage<TOIMessageType.ContextlessGesture> & {
    gestureType: "none" | "scratch" | "left-right" | "right-left" | "bottom-top" | "top-bottom" | "surround";
    strokeId: string;
};
/**
 * @group Recognizer
 */
type TOIMessageEventPong = TOIMessage<TOIMessageType.Pong>;
/**
 * @group Recognizer
 */
type TOIMessageEventIdle = TOIMessage<TOIMessageType.Idle>;
/**
 * @group Recognizer
 */
type TOIMessageEventError = TOIMessage<TOIMessageType.Error> & {
    code?: number | string;
    message?: string;
    data?: {
        code: number | string;
        message: string;
    };
};
/**
 * @group Recognizer
 */
type TOIMessageReceived = TOIMessageEventAuthenticated | TOIMessageEventHMACChallenge | TOISessionDescriptionMessage | TOIMessageEventNewPart | TOIMessageEventPartChange | TOIMessageEventContentChange | TOIMessageEventExport | TOIMessageEventGesture | TOIMessageEventContextlessGesture | TOIMessageEventPong | TOIMessageEventIdle | TOIMessageEventError;

/**
 * A websocket dialog have this sequence :
 * --------------- Client --------------------------------------------------------------- Server ---------------
 * { type: "authenticate" }                           ==================>
 *                                                    <==================       { type: "hmacChallenge" }
 * { type: "hmac" }                                   ==================>
 *                                                    <==================       { type: "authenticated" }
 * { type: "initSession" | "restoreSession" }         ==================>
 *                                                    <==================       { type: "sessionDescription" }
 * { type: "newContentPart" | "openContentPart" }     ==================>
 *                                                    <==================       { type: "partChanged" }
 * { type: "addStrokes" }                             ==================>
 *                                                    <==================       { type: "contentChanged" }
 * { type: "transform" }                              ==================>
 *                                                    <==================       { type: "contentChanged" }
 * { type: "eraseStrokes" }                           ==================>
 *                                                    <==================       { type: "contentChanged" }
 */
/**
 * @group Recognizer
 */
declare class OIRecognizer {
    #private;
    protected serverConfiguration: TServerConfiguration;
    protected recognitionConfiguration: TRecognitionConfiguration;
    protected socket: WebSocket;
    protected pingWorker?: Worker;
    protected pingCount: number;
    protected reconnectionCount: number;
    protected sessionId?: string;
    protected currentPartId?: string;
    protected currentErrorCode?: string | number;
    protected connected: DeferredPromise<void>;
    protected initialized: DeferredPromise<void>;
    protected addStrokeDeferred?: DeferredPromise<TOIMessageEventGesture | undefined>;
    protected contextlessGestureDeferred: Map<string, DeferredPromise<TOIMessageEventContextlessGesture>>;
    protected transformStrokeDeferred?: DeferredPromise<void>;
    protected eraseStrokeDeferred?: DeferredPromise<void>;
    protected replaceStrokeDeferred?: DeferredPromise<void>;
    protected exportDeferredMap: Map<string, DeferredPromise<TExport>>;
    protected closeDeferred?: DeferredPromise<void>;
    protected waitForIdleDeferred?: DeferredPromise<void>;
    protected undoDeferred?: DeferredPromise<void>;
    protected redoDeferred?: DeferredPromise<void>;
    protected clearDeferred?: DeferredPromise<void>;
    url: string;
    constructor(serverConfig: TServerConfiguration, recognitionConfig: TRecognitionConfiguration);
    get mimeTypes(): string[];
    get event(): InternalEvent;
    protected rejectDeferredPending(error: Error | string): void;
    protected resetAllDeferred(): void;
    protected clearSocketListener(): void;
    protected closeCallback(evt: CloseEvent): void;
    protected openCallback(): void;
    protected manageHMACChallenge(hmacChallengeMessage: TOIMessageEventHMACChallenge): Promise<void>;
    protected initPing(): void;
    protected manageAuthenticated(): void;
    protected manageSessionDescriptionMessage(sessionDescriptionMessage: TOISessionDescriptionMessage): void;
    protected manageNewPartMessage(newPartMessage: TOIMessageEventNewPart): void;
    protected managePartChangeMessage(partChangeMessage: TOIMessageEventPartChange): void;
    protected manageContentChangedMessage(contentChangeMessage: TOIMessageEventContentChange): void;
    protected manageExportMessage(exportMessage: TOIMessageEventExport): void;
    protected manageWaitForIdle(): void;
    protected manageErrorMessage(errorMessage: TOIMessageEventError): void;
    protected manageGestureDetected(gestureMessage: TOIMessageEventGesture): void;
    protected manageContextlessGesture(gestureMessage: TOIMessageEventContextlessGesture): void;
    protected messageCallback(message: MessageEvent<string>): void;
    init(): Promise<void>;
    send(message: TOIMessageEvent): Promise<void>;
    protected buildAddStrokesMessage(strokes: OIStroke[], processGestures?: boolean): TOIMessageEvent;
    addStrokes(strokes: OIStroke[], processGestures?: boolean): Promise<TOIMessageEventGesture | undefined>;
    protected buildReplaceStrokesMessage(oldStrokeIds: string[], newStrokes: OIStroke[]): TOIMessageEvent;
    replaceStrokes(oldStrokeIds: string[], newStrokes: OIStroke[]): Promise<void>;
    protected buildTransformTranslateMessage(strokeIds: string[], tx: number, ty: number): TOIMessageEvent;
    transformTranslate(strokeIds: string[], tx: number, ty: number): Promise<void>;
    protected buildTransformRotateMessage(strokeIds: string[], angle: number, x0?: number, y0?: number): TOIMessageEvent;
    transformRotate(strokeIds: string[], angle: number, x0?: number, y0?: number): Promise<void>;
    protected buildTransformScaleMessage(strokeIds: string[], scaleX: number, scaleY: number, x0?: number, y0?: number): TOIMessageEvent;
    transformScale(strokeIds: string[], scaleX: number, scaleY: number, x0?: number, y0?: number): Promise<void>;
    protected buildTransformMatrixMessage(strokeIds: string[], matrix: TMatrixTransform): TOIMessageEvent;
    transformMatrix(strokeIds: string[], matrix: TMatrixTransform): Promise<void>;
    protected buildEraseStrokesMessage(strokeIds: string[]): TOIMessageEvent;
    eraseStrokes(strokeIds: string[]): Promise<void>;
    recognizeGesture(stroke: OIStroke): Promise<TOIMessageEventContextlessGesture | undefined>;
    waitForIdle(): Promise<void>;
    protected buildUndoRedoChanges(changes: TOIHistoryBackendChanges): TOIMessageEvent[];
    undo(actions: TOIHistoryBackendChanges): Promise<void>;
    redo(actions: TOIHistoryBackendChanges): Promise<void>;
    export(requestedMimeTypes?: string[]): Promise<TExport>;
    clear(): Promise<void>;
    close(code: number, reason: string): Promise<void>;
    destroy(): Promise<void>;
}

/**
 * @group Recognizer
 */
type TRestPostConfiguration = {
    lang: string;
    diagram?: TDiagramConfiguration;
    math?: TMathConfiguration;
    "raw-content"?: TRawContentConfiguration;
    text?: TTextConfiguration;
    export: TExportConfiguration;
};
/**
 * @group Recognizer
 */
type TRestPostData = {
    configuration: TRestPostConfiguration;
    xDPI: number;
    yDPI: number;
    contentType: string;
    conversionState?: TConverstionState;
    height: number;
    width: number;
    strokeGroups: TStrokeGroupToSend[];
};
/**
 * @group Recognizer
 */
declare class RestRecognizer {
    #private;
    protected serverConfiguration: TServerConfiguration;
    protected recognitionConfiguration: TRecognitionConfiguration;
    constructor(serverConfig: TServerConfiguration, recognitionConfig: TRecognitionConfiguration);
    get url(): string;
    get postConfig(): TRestPostConfiguration;
    protected buildData(model: Model): TRestPostData;
    protected post(data: unknown, mimeType: string): Promise<unknown>;
    protected tryFetch(data: TRestPostData, mimeType: string): Promise<TExport | never>;
    protected getMimeTypes(requestedMimeTypes?: string[]): string[];
    convert(model: Model, conversionState?: TConverstionState, requestedMimeTypes?: string[]): Promise<Model>;
    export(model: Model, requestedMimeTypes?: string[]): Promise<Model>;
    resize(model: Model): Promise<Model>;
}

/**
 * @group Recognizer
 */
type TWSMessageEvent = {
    type: string;
    [key: string]: unknown;
};
/**
 * @group Recognizer
 */
type TWSMessageEventError = {
    type: string;
    code?: number | string;
    message?: string;
    data?: {
        code: number | string;
        message: string;
    };
};
/**
 * @group Recognizer
 */
type TWSMessageEventHMACChallenge = TWSMessageEvent & {
    hmacChallenge: string;
    iinkSessionId: string;
};
/**
 * @group Recognizer
 */
type TWSMessageEventContentPackageDescriptionMessage = TWSMessageEvent & {
    contentPartCount: number;
};
/**
 * @group Recognizer
 */
type TWSMessageEventPartChange = TWSMessageEvent & {
    partIdx: number;
    partId: string;
    partCount: number;
};
/**
 * @group Recognizer
 */
type TWSMessageEventContentChange = TWSMessageEvent & {
    partId: string;
    canUndo: boolean;
    canRedo: boolean;
    empty: boolean;
    undoStackIndex: number;
    possibleUndoCount: number;
};
/**
 * @group Recognizer
 */
type TWSMessageEventExport = TWSMessageEvent & {
    partId: string;
    exports: TExport;
};
/**
 * @group Recognizer
 */
type TUpdatePatchType = "REPLACE_ALL" | "REMOVE_ELEMENT" | "REPLACE_ELEMENT" | "REMOVE_CHILD" | "APPEND_CHILD" | "INSERT_BEFORE" | "REMOVE_ATTRIBUTE" | "SET_ATTRIBUTE";
/**
 * @group Recognizer
 */
type TUpdatePatch = {
    type: TUpdatePatchType;
};
/**
 * @group Recognizer
 */
type TUpdatePatchReplaceAll = TUpdatePatch & {
    type: "REPLACE_ALL";
    svg: string;
};
/**
 * @group Recognizer
 */
type TUpdatePatchReplaceELement = TUpdatePatch & {
    type: "REPLACE_ELEMENT";
    id: string;
    svg: string;
};
/**
 * @group Recognizer
 */
type TUpdatePatchInsertBefore = TUpdatePatch & {
    type: "INSERT_BEFORE";
    refId: string;
    svg: string;
};
/**
 * @group Recognizer
 */
type TUpdatePatchRemoveElement = TUpdatePatch & {
    type: "REMOVE_ELEMENT";
    id: string;
};
/**
 * @group Recognizer
 */
type TUpdatePatchAppendChild = TUpdatePatch & {
    type: "APPEND_CHILD";
    parentId?: string;
    svg: string;
};
/**
 * @group Recognizer
 */
type TUpdatePatchRemoveChild = TUpdatePatch & {
    type: "REMOVE_CHILD";
    parentId: string;
    index: number;
};
/**
 * @group Recognizer
 */
type TUpdatePatchRemoveAttribut = TUpdatePatch & {
    type: "REMOVE_ATTRIBUTE";
    id?: string;
    name: string;
};
/**
 * @group Recognizer
 */
type TUpdatePatchSetAttribut = TUpdatePatch & {
    type: "SET_ATTRIBUTE";
    id?: string;
    name: string;
    value: string;
};
/**
 * @group Recognizer
 */
type TWSMessageEventSVGPatch = TWSMessageEvent & {
    updates: TUpdatePatch[];
    layer: ("MODEL" | "CAPTURE");
};

/**
 * A websocket dialog have this sequence :
 * --------------------------- Client --------------------------------------------------- Server ----------------------------------
 * init: send newContentPackage or restoreIInkSession           ==================>
 *                                                              <==================       ack
 * answer ack:
 *  send the hmac (if enable)                                   ==================>
 *  send the configuration                                      ==================>
 *                                                              <==================       contentPackageDescription
 * answer contentPackageDescription:
 *  send newContentPart or openContentPart                      ==================>
 *                                                              <==================        partChanged
 *                                                              <==================        contentChanged
 *                                                              <==================        newPart
 *                                                              <==================        svgPatch
 *
 * setPenStyle (send the parameters)                            ==================>
 * setTheme (send the parameters)                               ==================>
 * setPenStyleClasses (send the parameters)                     ==================>
 *                                                              <==================        svgPatch
 * addStrokes (send the strokes ) ============>
 *                                                              <==================        update
 */
/**
 * @group Recognizer
 */
declare class WSRecognizer {
    #private;
    protected serverConfiguration: TServerConfiguration;
    protected recognitionConfiguration: TRecognitionConfiguration;
    protected socket: WebSocket;
    protected pingCount: number;
    protected reconnectionCount: number;
    protected viewSizeHeight: number;
    protected viewSizeWidth: number;
    protected sessionId?: string;
    currentPartId?: string;
    protected currentErrorCode?: string | number;
    protected penStyle?: TPenStyle;
    protected penStyleClasses?: string;
    protected theme?: TTheme;
    protected connected?: DeferredPromise<void>;
    protected initialized?: DeferredPromise<void>;
    protected ackDeferred?: DeferredPromise<void>;
    protected addStrokeDeferred?: DeferredPromise<TExport>;
    protected exportDeferred?: DeferredPromise<TExport>;
    protected convertDeferred?: DeferredPromise<TExport>;
    protected importDeferred?: DeferredPromise<TExport>;
    protected resizeDeferred?: DeferredPromise<void>;
    protected undoDeferred?: DeferredPromise<TExport>;
    protected redoDeferred?: DeferredPromise<TExport>;
    protected clearDeferred?: DeferredPromise<TExport>;
    protected importPointEventsDeferred?: DeferredPromise<TExport>;
    protected waitForIdleDeferred?: DeferredPromise<void>;
    url: string;
    constructor(serverConfig: TServerConfiguration, recognitionConfig: TRecognitionConfiguration);
    get mimeTypes(): string[];
    get internalEvent(): InternalEvent;
    protected infinitePing(): void;
    protected openCallback(): void;
    protected rejectDeferredPending(error: Error): void;
    protected closeCallback(evt: CloseEvent): void;
    protected manageAckMessage(websocketMessage: TWSMessageEvent): Promise<void>;
    protected manageContentPackageDescriptionMessage(): Promise<void>;
    protected managePartChangeMessage(websocketMessage: TWSMessageEvent): void;
    protected manageExportMessage(websocketMessage: TWSMessageEvent): void;
    protected manageWaitForIdle(): Promise<void>;
    protected manageErrorMessage(websocketMessage: TWSMessageEvent): void;
    protected manageContentChangeMessage(websocketMessage: TWSMessageEvent): void;
    protected manageSVGPatchMessage(websocketMessage: TWSMessageEvent): void;
    protected messageCallback(message: MessageEvent<string>): void;
    init(height: number, width: number): Promise<void>;
    send(message: TWSMessageEvent): Promise<void>;
    addStrokes(strokes: Stroke[]): Promise<TExport>;
    setPenStyle(penStyle: TPenStyle): Promise<void>;
    setPenStyleClasses(penStyleClasses: string): Promise<void>;
    setTheme(theme: TTheme): Promise<void>;
    export(model: Model, requestedMimeTypes?: string[]): Promise<Model>;
    import(model: Model, data: Blob, mimeType?: string): Promise<Model>;
    resize(model: Model): Promise<Model>;
    importPointEvents(strokes: Stroke[]): Promise<TExport>;
    convert(model: Model, conversionState?: TConverstionState): Promise<Model>;
    waitForIdle(): Promise<void>;
    undo(model: Model): Promise<Model>;
    redo(model: Model): Promise<Model>;
    clear(model: Model): Promise<Model>;
    close(code: number, reason: string): void;
    destroy(): void;
}

/**
 * @group Event
 * @description Lists all internal library events
 * @example
 * You can run code on "EventType" raised by using
 * ```ts
 * editor.internalEvents.addEventListener(InternalEventType.SVG_PATCH, (evt) => console.log(evt.detail))
 * ```
 */
declare enum InternalEventType {
    SVG_PATCH = "internal_svg_patch",
    EXPORTED = "internal_exported",
    CLEAR_MESSAGE = "internal_clear_message",
    ERROR = "internal_error",
    NOTIF = "internal_notif",
    IMPORT_JIIX = "internal_import_jiix",
    CONVERT = "internal_convert",
    CLEAR = "internal_clear",
    CONTEXT_CHANGE = "internal_context_change",
    IDLE = "internal_idle",
    SELECTED = "internal_selected",
    INTENTION = "internal_intention"
}
/**
 * @group Event
 */
declare class InternalEvent extends EventTarget {
    #private;
    private constructor();
    static getInstance(): InternalEvent;
    removeAllListeners(): void;
    emitSVGPatch(patchChange: TWSMessageEventSVGPatch): void;
    addSVGPatchListener(callback: (contentChange: TWSMessageEventSVGPatch) => void): void;
    emitExported(exports: TExport): void;
    addExportedListener(callback: (exports: TExport) => void): void;
    emitClearMessage(): void;
    addClearMessageListener(callback: () => void): void;
    emitError(err: Error): void;
    addErrorListener(callback: (err: Error) => void): void;
    emitNotif(notif: {
        message: string;
        timeout?: number;
    }): void;
    addNotifListener(callback: (notif: {
        message: string;
        timeout?: number;
    }) => void): void;
    emitImportJIIX(jiix: TJIIXExport): void;
    addImportJIIXListener(callback: (jiix: TJIIXExport) => void): void;
    emitConvert(conversionState?: TConverstionState): void;
    addConvertListener(callback: (params?: {
        conversionState?: TConverstionState;
        mimeTypes?: string[];
    }) => void): void;
    emitClear(): void;
    addClearListener(callback: () => void): void;
    emitContextChange(context: TUndoRedoContext): void;
    addContextChangeListener(callback: (context: TUndoRedoContext) => void): void;
    emitIdle(idle: boolean): void;
    addIdleListener(callback: (idle: boolean) => void): void;
    emitSelected(symbols: TOISymbol[]): void;
    addSelectedListener(callback: (symbols: TOISymbol[]) => void): void;
    emitIntention(intention: Intention): void;
    addIntentionListener(callback: (intention: Intention) => void): void;
}

/**
 * @group Event
 * @description Lists all events that can be listened to on the editor or DOM element
 * @example
 * You can run code on "EventType" raised by using
 * ```ts
 * editor.events.addEventListener(EventType.CHANGED, (evt) => console.log(evt.detail))
 * ```
 */
declare enum EventType {
    /**
     * @description event emitted when history has changed i.e. the context of undo-redo
     */
    CHANGED = "changed",
    /**
     * @description event emitted when clearing is complete
     */
    CLEARED = "cleared",
    /**
     * @description event emitted after the conversion is complete
     */
    CONVERTED = "converted",
    /**
     * @description event emitted when the editor encounters an error
     */
    ERROR = "error",
    /**
     * @description event emitted on click on pointer events
     */
    POINTEREVENTS = "pointer_events",
    /**
     * @description event emitted after the end of the export
     */
    EXPORTED = "exported",
    /**
     * @description event emitted after the end of the import
     */
    IMPORTED = "imported",
    /**
     * @description event emitted when the server is idle after a job
     */
    IDLE = "idle",
    /**
     * @description event emitted after full editor initialization
     */
    LOADED = "loaded",
    /**
    * @description event emitted after
    */
    SELECTED = "selected",
    /**
    * @description event emitted after
    */
    INTENTION = "intention"
}
/**
 * @group Event
 */
declare class PublicEvent extends EventTarget {
    #private;
    private constructor();
    static getInstance(): PublicEvent;
    setElement(el: HTMLElement): void;
    emitLoaded(): void;
    emitExported(exports: TExport): void;
    emitChanged(undoRedoContext: TUndoRedoContext): void;
    emitIdle(idle: boolean): void;
    emitCleared(model?: IModel): void;
    emitConverted(exports: TExport): void;
    emitImported(exports: TExport): void;
    emitSelected(symbols: TSymbol[]): void;
    emitIntention(intention: Intention): void;
}

/**
 * @group History
 */
declare class HistoryManager implements IHistoryManager {
    #private;
    configuration: TUndoRedoConfiguration;
    context: TUndoRedoContext;
    stack: IModel[];
    constructor(configuration: TUndoRedoConfiguration);
    get internalEvent(): InternalEvent;
    private updateContext;
    push(model: IModel): void;
    updateStack(model: IModel): void;
    undo(): IModel;
    redo(): IModel;
}

/**
 * @group History
 */
type TOIHistoryChanges = {
    added?: TOISymbol[];
    updated?: TOISymbol[];
    erased?: TOISymbol[];
    replaced?: {
        oldSymbols: TOISymbol[];
        newSymbols: TOISymbol[];
    };
    matrix?: {
        symbols: TOISymbol[];
        matrix: TMatrixTransform;
    };
    translate?: {
        symbols: TOISymbol[];
        tx: number;
        ty: number;
    }[];
    scale?: {
        symbols: TOISymbol[];
        scaleX: number;
        scaleY: number;
        origin: TPoint;
    }[];
    rotate?: {
        symbols: TOISymbol[];
        angle: number;
        center: TPoint;
    }[];
    style?: {
        symbols: TOISymbol[];
        style?: TStyle;
        fontSize?: number;
    };
    order?: {
        symbols: TOISymbol[];
        position: "first" | "last" | "forward" | "backward";
    };
    decorator?: {
        symbol: TOISymbol;
        decorator: OIDecorator;
        added: boolean;
    }[];
    group?: {
        symbols: TOISymbol[];
    };
    ungroup?: {
        group: TOISymbol;
    };
};
/**
 * @group History
 * @remarks used to send messages to the backend on undo or redo
 */
type TOIHistoryBackendChanges = {
    added?: OIStroke[];
    erased?: OIStroke[];
    replaced?: {
        oldStrokes: OIStroke[];
        newStrokes: OIStroke[];
    };
    matrix?: {
        strokes: OIStroke[];
        matrix: TMatrixTransform;
    };
    translate?: {
        strokes: OIStroke[];
        tx: number;
        ty: number;
    }[];
    scale?: {
        strokes: OIStroke[];
        scaleX: number;
        scaleY: number;
        origin: TPoint;
    }[];
    rotate?: {
        strokes: OIStroke[];
        angle: number;
        center: TPoint;
    }[];
};
/**
 * @group History
 */
type TOIHistoryStackItem = {
    changes: TOIHistoryChanges;
    model: OIModel;
};
/**
 * @group History
 */
declare class OIHistoryManager implements IHistoryManager {
    #private;
    configuration: TUndoRedoConfiguration;
    context: TUndoRedoContext;
    stack: TOIHistoryStackItem[];
    constructor(configuration: TUndoRedoConfiguration);
    get internalEvent(): InternalEvent;
    private updateContext;
    isChangesEmpty(changes: TOIHistoryChanges): boolean;
    init(model: OIModel): void;
    push(model: OIModel, changes: TOIHistoryChanges): void;
    pop(): void;
    protected reverseChanges(changes: TOIHistoryChanges): TOIHistoryChanges;
    undo(): TOIHistoryStackItem;
    redo(): TOIHistoryStackItem;
    clear(): void;
}

/**
 * @group Behavior
 */
interface IBehaviors {
    name: string;
    grabber: IGrabber;
    history: IHistoryManager;
    intention: Intention;
    get currentPenStyle(): TStyle;
    get model(): IModel;
    get penStyle(): TStyle;
    setPenStyle(penStyle?: PartialDeep<TStyle>): Promise<void>;
    get penStyleClasses(): string;
    setPenStyleClasses(penStyleClasses?: string): Promise<void>;
    get theme(): TTheme;
    setTheme(theme?: PartialDeep<TTheme>): Promise<void>;
    get configuration(): TConfiguration;
    set configuration(conf: TConfiguration);
    init(element: HTMLElement): Promise<void>;
    export(mimeTypes?: string[]): Promise<IModel>;
    convert(conversionState?: TConverstionState, requestedMimeTypes?: string[]): Promise<IModel>;
    resize(height: number, width: number): Promise<IModel>;
    undo(): Promise<IModel>;
    redo(): Promise<IModel>;
    waitForIdle?(): Promise<void>;
    importPointEvents(strokes: PartialDeep<TStroke>[]): Promise<IModel>;
    import?(data: Blob, mimeType?: string): Promise<IModel>;
    clear(): Promise<IModel>;
    destroy(): Promise<void>;
}

/**
 * @group Renderer
 */
declare class CanvasRendererShape {
    #private;
    symbols: {
        table: string;
        ellipse: string;
        line: string;
    };
    protected phi(angle: number): number;
    protected drawEllipseArc(context2D: CanvasRenderingContext2D, shapeEllipse: TCanvasShapeEllipseSymbol): TPoint[];
    protected drawLine(context2D: CanvasRenderingContext2D, p1: TPoint, p2: TPoint): void;
    protected drawArrowHead(context2D: CanvasRenderingContext2D, headPoint: TPoint, angle: number, length: number): void;
    protected drawShapeEllipse(context2D: CanvasRenderingContext2D, shapeEllipse: TCanvasShapeEllipseSymbol): void;
    protected drawShapeLine(context2D: CanvasRenderingContext2D, shapeLine: TCanvasShapeLineSymbol): void;
    draw(context2D: CanvasRenderingContext2D, symbol: TSymbol): void;
}

/**
 * @group Renderer
 */
declare class CanvasRendererStroke {
    #private;
    protected renderArc(context2d: CanvasRenderingContext2D, center: TPointer, radius: number): void;
    protected renderLine(context2d: CanvasRenderingContext2D, begin: TPointer, end: TPointer, width: number): void;
    protected renderFinal(context2d: CanvasRenderingContext2D, begin: TPointer, end: TPointer, width: number): void;
    protected renderQuadratic(context2d: CanvasRenderingContext2D, begin: TPointer, end: TPointer, ctrl: TPointer, width: number): void;
    draw(context2d: CanvasRenderingContext2D, stroke: Stroke): void;
}

/**
 * @group Renderer
 */
declare class CanvasRendererText {
    #private;
    symbols: {
        char: string;
        string: string;
        textLine: string;
    };
    protected drawUnderline(context2D: CanvasRenderingContext2D, textUnderline: TCanvasTextUnderlineSymbol, underline: TCanvasUnderLineSymbol): void;
    protected drawText(context2D: CanvasRenderingContext2D, text: TCanvasTextSymbol): void;
    protected drawTextLine(context2D: CanvasRenderingContext2D, textUnderline: TCanvasTextUnderlineSymbol): void;
    draw(context2D: CanvasRenderingContext2D, symbol: TSymbol): void;
}

/**
 * @group Renderer
 */
declare class CanvasRenderer {
    #private;
    configuration: TRenderingConfiguration;
    strokeRenderer: CanvasRendererStroke;
    shapeRenderer: CanvasRendererShape;
    textRenderer: CanvasRendererText;
    context: {
        parent: HTMLElement;
        renderingCanvas: HTMLCanvasElement;
        renderingCanvasContext: CanvasRenderingContext2D;
        capturingCanvas: HTMLCanvasElement;
        capturingCanvasContext: CanvasRenderingContext2D;
    };
    constructor(config: TRenderingConfiguration);
    protected createCanvas(type: string): HTMLCanvasElement;
    protected resizeContent(): void;
    protected drawSymbol(context2D: CanvasRenderingContext2D, symbol: TSymbol): void;
    init(element: HTMLElement): void;
    drawModel(model: IModel): void;
    drawPendingStroke(stroke: Stroke | undefined): void;
    resize(model: IModel): void;
    destroy(): void;
}

/**
 * @group Renderer
 */
declare class OISVGRenderer {
    #private;
    groupGuidesId: string;
    configuration: TRenderingConfiguration;
    parent: HTMLElement;
    layer: SVGElement;
    definitionGroup: SVGGElement;
    verticalGuides: number[];
    horizontalGuides: number[];
    constructor(configuration: TRenderingConfiguration);
    protected initLayer(): void;
    protected createDefs(): SVGDefsElement;
    protected createFilters(): SVGGElement;
    protected drawGuides(): void;
    protected removeGuides(): void;
    protected createSVGTools(): SVGGElement;
    init(element: HTMLElement): void;
    getAttribute(id: string, name: string): string | undefined | null;
    setAttribute(id: string, name: string, value: string): void;
    buildElementFromSymbol(symbol: TOISymbol | OIEraser): SVGGraphicsElement | undefined;
    prependElement(el: Element): void;
    changeOrderSymbol(symbolToMove: TOISymbol, position: "first" | "last" | "forward" | "backward"): void;
    appendElement(el: Element): void;
    removeElement(id: string): void;
    drawSymbol(symbol: TOISymbol | OIEraser): SVGGraphicsElement | undefined;
    replaceSymbol(id: string, symbols: TOISymbol[]): SVGGraphicsElement[] | undefined;
    removeSymbol(id: string): void;
    drawCircle(point: TPoint, radius: number, attrs?: {
        [key: string]: string;
    }): void;
    drawRect(box: TBoundingBox, attrs?: {
        [key: string]: string;
    }): void;
    drawLine(p1: TPoint, p2: TPoint, attrs?: {
        [key: string]: string;
    }): void;
    drawConnectionBetweenBox(id: string, box1: TBoundingBox, box2: TBoundingBox, attrs?: {
        [key: string]: string;
    }): void;
    resize(height: number, width: number): void;
    getElementById(id: string): SVGGraphicsElement | null;
    getElements({ tagName, attrs }: {
        tagName?: string;
        attrs?: {
            [key: string]: string;
        };
    }): NodeListOf<Element>;
    clearElements({ tagName, attrs }: {
        tagName?: string;
        attrs?: {
            [key: string]: string;
        };
    }): void;
    clear(): void;
    destroy(): void;
}

/**
 * @group Renderer
 */
declare const OISVGRendererConst: {
    arrowHeadStartMarker: string;
    arrowHeadEndMaker: string;
    selectionFilterId: string;
    removalFilterId: string;
    crossMarker: string;
    noSelection: string;
};

/**
 * @group Renderer
 */
declare class OISVGRendererDecoratorUtil {
    static getSVGElement(decorator: OIDecorator, { deleting, style, bounds }: {
        deleting: boolean;
        style: TStyle;
        bounds: Box;
    }): SVGGeometryElement | undefined;
}

/**
 * @group Renderer
 */
declare class OISVGRendererEdgeUtil {
    static getLinePath(line: OIEdgeLine): string;
    static getPolyLinePath(line: OIEdgePolyLine): string;
    static getArcPath(arc: OIEdgeArc): string;
    static getSVGPath(edge: TOIEdge): string;
    static getSVGElement(edge: TOIEdge): SVGGraphicsElement;
}

/**
 * @group Renderer
 */
declare class OISVGRendererEraserUtil {
    static getSVGPath(eraser: OIEraser): string;
    static getSVGElement(eraser: OIEraser): SVGPathElement;
}

/**
 * @group Renderer
 */
declare class OISVGRendererGroupUtil {
    static getChildElement(symbol: TOISymbol | OIEraser): SVGGraphicsElement | undefined;
    static getSVGElement(symbolGroup: OISymbolGroup): SVGGraphicsElement;
}

/**
 * @group Renderer
 */
declare class OISVGRendererTextUtil {
    static getSVGElement(text: OIText): SVGGraphicsElement;
}

/**
 * @group Renderer
 */
declare class OISVGRendererShapeUtil {
    static getPolygonePath(polygon: OIShapePolygon): string;
    static getCirclePath(circle: OIShapeCircle): string;
    static getEllipsePath(ellipse: OIShapeEllipse): string;
    static getSVGPath(shape: TOIShape): string;
    static getSVGElement(shape: TOIShape): SVGGraphicsElement;
}

/**
 * @group Renderer
 */
declare class OISVGRendererStrokeUtil {
    protected static getArcPath(center: TPointer, radius: number): string;
    protected static getLinePath(begin: TPointer, end: TPointer, width: number): string;
    protected static getFinalPath(begin: TPointer, end: TPointer, width: number): string;
    protected static getQuadraticPath(begin: TPointer, end: TPointer, central: TPointer, width: number): string;
    static getSVGPath(stroke: OIStroke): string;
    static getSVGElement(stroke: OIStroke): SVGGraphicsElement;
}

/**
 * @group Renderer
 */
declare class SVGBuilder {
    static createLayer(boundingBox: TBoundingBox, attrs?: {
        [key: string]: string;
    }): SVGElement;
    static createFilter(id: string, attrs?: {
        [key: string]: string;
    }): SVGFilterElement;
    static createDefs(): SVGDefsElement;
    static createMarker(id: string, attrs?: {
        [key: string]: string;
    }): SVGMarkerElement;
    static createComponentTransfert(): SVGFEComponentTransferElement;
    static createDropShadow({ dx, dy, deviation, color, opacity }: {
        dx?: number | undefined;
        dy?: number | undefined;
        deviation?: number | undefined;
        color?: string | undefined;
        opacity?: number | undefined;
    }): SVGFEDropShadowElement;
    static createTransfertFunctionTable(type: "feFuncA" | "feFuncB" | "feFuncG" | "feFuncR", values: string): SVGFEFuncAElement;
    static createGroup(attrs?: {
        [key: string]: string;
    }): SVGGElement;
    static createLine(p1: TPoint, p2: TPoint, attrs?: {
        [key: string]: string;
    }): SVGLineElement;
    static createCircle(p: TPoint, r: number, attrs?: {
        [key: string]: string;
    }): SVGCircleElement;
    static createPath(attrs?: {
        [key: string]: string;
    }): SVGPathElement;
    static createPolygon(points: number[], attrs?: {
        [key: string]: string;
    }): SVGPolylineElement;
    static createRect(box: TBoundingBox, attrs?: {
        [key: string]: string;
    }): SVGRectElement;
    static createTSpan(text: string, attrs?: {
        [key: string]: string;
    }): SVGTSpanElement;
    static createForeignObject(box: TBoundingBox, node: HTMLElement, attrs?: {
        [key: string]: string;
    }): SVGForeignObjectElement;
    static createText(p: TPoint, text: string, attrs?: {
        [key: string]: string;
    }): SVGTextElement;
}

/**
 * @group Renderer
 */
declare class SVGStroker {
    protected getArcPath(center: TPointer, radius: number): string;
    protected getLinePath(begin: TPointer, end: TPointer, width: number): string;
    protected getFinalPath(begin: TPointer, end: TPointer, width: number): string;
    protected getQuadraticPath(begin: TPointer, end: TPointer, central: TPointer, width: number): string;
    protected buildSVGPath(stroke: TStroke): string;
    drawStroke(svgElement: SVGElement, stroke: TStroke, attrs?: {
        name: string;
        value: string;
    }[]): void;
}

/**
 * @group Renderer
 */
declare class WSSVGRenderer {
    #private;
    config: TRenderingConfiguration;
    stroker: SVGStroker;
    context: {
        parent: HTMLElement;
    };
    constructor(config: TRenderingConfiguration);
    init(element: HTMLElement): void;
    protected drawStroke(svgElement: SVGElement, stroke: TStroke): void;
    protected replaceAll(layerName: string, update: TUpdatePatchReplaceAll): void;
    protected replaceElement(update: TUpdatePatchReplaceELement): void;
    protected appendChild(layerName: string, update: TUpdatePatchAppendChild): void;
    protected removeChild(update: TUpdatePatchRemoveChild): void;
    protected removeElement(update: TUpdatePatchRemoveElement): void;
    protected insertBefore(update: TUpdatePatchInsertBefore): void;
    protected setAttribute(update: TUpdatePatchSetAttribut): void;
    protected removeAttribute(update: TUpdatePatchRemoveAttribut): void;
    updateLayer(layerName: string, update: TUpdatePatch): void;
    updatesLayer(layerName: string, updates: TUpdatePatch[]): void;
    clearPendingStroke(): void;
    drawPendingStroke(stroke: TStroke): void;
    clearErasingStrokes(): void;
    resize(model: IModel): void;
    destroy(): void;
}

/**
 * @group Manager
 */
declare class OIConversionManager {
    #private;
    behaviors: OIBehaviors;
    fontSize?: number;
    fontWeight?: "bold" | "normal";
    constructor(behaviors: OIBehaviors, fontStyle?: {
        size?: number | undefined;
        weight?: ("bold" | "normal") | undefined;
    });
    get model(): OIModel;
    get rowHeight(): number;
    protected computeFontSize(chars: TJIIXChar[]): number;
    buildChar(char: TJIIXChar, strokes: OIStroke[], fontSize: number): TOISymbolChar;
    buildWord(word: TJIIXWord, chars: TJIIXChar[], strokes: OIStroke[], fontSize?: number): OIText;
    convertText(text: TJIIXTextElement, strokes: OIStroke[], onlyText: boolean): {
        symbol: OIText;
        strokes: OIStroke[];
    }[] | undefined;
    buildCircle(circle: TJIIXNodeCircle, strokes: OIStroke[]): OIShapeCircle;
    buildEllipse(ellipse: TJIIXNodeEllipse, strokes: OIStroke[]): OIShapeEllipse;
    buildRectangle(rectangle: TJIIXNodeRectangle, strokes: OIStroke[]): OIShapePolygon;
    buildPolygon(polygon: TJIIXNodePolygon, strokes: OIStroke[]): OIShapePolygon;
    buildRhombus(polygon: TJIIXNodeRhombus, strokes: OIStroke[]): OIShapePolygon;
    buildTriangle(polygon: TJIIXNodeTriangle, strokes: OIStroke[]): OIShapePolygon;
    buildParallelogram(polygon: TJIIXNodeParrallelogram, strokes: OIStroke[]): OIShapePolygon;
    convertNode(node: TJIIXNodeElement, strokes: OIStroke[]): {
        symbol: TOIShape;
        strokes: OIStroke[];
    } | undefined;
    buildLine(line: TJIIXEdgeLine, strokes: OIStroke[]): OIEdgeLine;
    buildPolyEdge(polyline: TJIIXEdgePolyEdge, strokes: OIStroke[]): OIEdgePolyLine;
    buildArc(arc: TJIIXEdgeArc, strokes: OIStroke[]): OIEdgeArc;
    convertEdge(edge: TJIIXEdgeElement, strokes: OIStroke[]): {
        symbol: TOIEdge;
        strokes: OIStroke[];
    } | undefined;
    apply(symbols?: TOISymbol[]): Promise<void>;
}

/**
 * @group Manager
 */
declare class OITranslateManager {
    #private;
    behaviors: OIBehaviors;
    interactElementsGroup?: SVGElement;
    transformOrigin: TPoint;
    constructor(behaviors: OIBehaviors);
    get model(): OIModel;
    protected applyToStroke(stroke: OIStroke, tx: number, ty: number): OIStroke;
    protected applyToShape(shape: TOIShape, tx: number, ty: number): TOIShape;
    protected applyToEdge(edge: TOIEdge, tx: number, ty: number): TOIEdge;
    protected applyOnText(text: OIText, tx: number, ty: number): OIText;
    protected applyOnGroup(group: OISymbolGroup, tx: number, ty: number): OISymbolGroup;
    applyToSymbol(symbol: TOISymbol, tx: number, ty: number): TOISymbol;
    translate(symbols: TOISymbol[], tx: number, ty: number, addToHistory?: boolean): Promise<void>;
    translateElement(id: string, tx: number, ty: number): void;
    start(target: Element, origin: TPoint): void;
    continue(point: TPoint): {
        tx: number;
        ty: number;
    };
    end(point: TPoint): Promise<void>;
}

/**
 * @group Manager
 */
declare class OITextManager {
    #private;
    behaviors: OIBehaviors;
    constructor(behaviors: OIBehaviors);
    get renderer(): OISVGRenderer;
    get rowHeight(): number;
    get model(): OIModel;
    protected drawSymbolHidden(text: OIText): SVGGElement;
    setCharsBounds(text: OIText, textGroupEl: SVGGElement): OIText;
    setBounds(text: OIText): void;
    getElementBoundingBox(textElement: SVGElement): Box;
    getBoundingBox(text: OIText): Box;
    getSpaceWidth(fontSize: number): number;
    updateBounds(textSymbol: OIText): OIText;
    moveTextAfter(text: OIText, tx: number): TOISymbol[] | undefined;
}

/**
 * @group Manager
 */
declare class OIGestureManager {
    #private;
    insertAction: InsertAction;
    surroundAction: SurroundAction;
    strikeThroughAction: StrikeThroughAction;
    behaviors: OIBehaviors;
    constructor(behaviors: OIBehaviors, gestureAction?: {
        surround?: SurroundAction;
        strikeThrough?: StrikeThroughAction;
        insert?: InsertAction;
    });
    get renderer(): OISVGRenderer;
    get recognizer(): OIRecognizer;
    get translator(): OITranslateManager;
    get texter(): OITextManager;
    get model(): OIModel;
    get history(): OIHistoryManager;
    get currentStyle(): TStyle;
    get rowHeight(): number;
    get strokeSpaceWidth(): number;
    applySurroundGesture(gestureStroke: OIStroke, gesture: TGesture): Promise<void>;
    protected computeScratchOnStrokes(gesture: TGesture, stroke: OIStroke): OIStroke[];
    protected computeScratchOnText(gestureStroke: OIStroke, textSymbol: OIText): OIText | undefined;
    protected computeScratchOnSymbol(gestureStroke: OIStroke, gesture: TGesture, symbol: TOISymbol): {
        erased?: boolean;
        replaced?: TOISymbol[];
    };
    applyScratch(gestureStroke: OIStroke, gesture: TGesture): Promise<void>;
    applyJoinGesture(gestureStroke: OIStroke, gesture: TGesture): Promise<void>;
    protected createStrokesFromGestureSubStroke(strokeOrigin: OIStroke, subStrokes: {
        x: number[];
        y: number[];
    }[]): OIStroke[];
    protected computeSplitStroke(strokeOrigin: OIStroke, subStrokes: {
        x: number[];
        y: number[];
    }[]): {
        before?: OIStroke;
        after?: OIStroke;
    };
    protected computeSplitStrokeInGroup(gestureStroke: OIStroke, group: OISymbolGroup, subStrokes: {
        fullStrokeId: string;
        x: number[];
        y: number[];
    }[]): OISymbolGroup[];
    protected computeChangesOnSplitStroke(gestureStroke: OIStroke, strokeIdToSplit: string, subStrokes: {
        fullStrokeId: string;
        x: number[];
        y: number[];
    }[]): TOIHistoryChanges;
    protected computeChangesOnSplitGroup(gestureStroke: OIStroke, groupToSplit: OISymbolGroup): TOIHistoryChanges;
    protected computeChangesOnSplitText(gestureStroke: OIStroke, textToSplit: OIText): TOIHistoryChanges;
    applyInsertGesture(gestureStroke: OIStroke, gesture: TGesture): Promise<void>;
    applyUnderlineGesture(gestureStroke: OIStroke, gesture: TGesture): Promise<void>;
    applyStrikeThroughGesture(gestureStroke: OIStroke, gesture: TGesture): Promise<void | TOISymbol[]>;
    apply(gestureStroke: OIStroke, gesture: TGesture): Promise<void>;
    getGestureFromContextLess(gestureStroke: OIStroke): Promise<TGesture | undefined>;
}

/**
 * @group Manager
 */
declare class OIResizeManager {
    #private;
    behaviors: OIBehaviors;
    interactElementsGroup?: SVGElement;
    direction: ResizeDirection;
    boundingBox: Box;
    transformOrigin: TPoint;
    keepRatio: boolean;
    constructor(behaviors: OIBehaviors);
    get model(): OIModel;
    protected applyToStroke(stroke: OIStroke, origin: TPoint, scaleX: number, scaleY: number): OIStroke;
    protected applyToShape(shape: TOIShape, origin: TPoint, scaleX: number, scaleY: number): TOIShape;
    protected applyToEdge(edge: TOIEdge, origin: TPoint, scaleX: number, scaleY: number): TOIEdge;
    protected applyOnText(text: OIText, origin: TPoint, scaleX: number, scaleY: number): OIText;
    protected applyOnGroup(group: OISymbolGroup, origin: TPoint, scaleX: number, scaleY: number): OISymbolGroup;
    applyToSymbol(symbol: TOISymbol, origin: TPoint, scaleX: number, scaleY: number): TOISymbol;
    setTransformOrigin(id: string, originX: number, originY: number): void;
    scaleElement(id: string, sx: number, sy: number): void;
    start(target: Element, origin: TPoint): void;
    continue(point: TPoint): {
        scaleX: number;
        scaleY: number;
    };
    end(point: TPoint): Promise<void>;
}

/**
 * @group Manager
 */
declare class OIRotationManager {
    #private;
    behaviors: OIBehaviors;
    interactElementsGroup?: SVGElement;
    center: TPoint;
    origin: TPoint;
    constructor(behaviors: OIBehaviors);
    get model(): OIModel;
    protected applyToStroke(stroke: OIStroke, center: TPoint, angleRad: number): OIStroke;
    protected applyToShape(shape: TOIShape, center: TPoint, angleRad: number): TOIShape;
    protected applyToEdge(edge: TOIEdge, center: TPoint, angleRad: number): TOIEdge;
    protected applyOnText(text: OIText, center: TPoint, angleRad: number): OIText;
    protected applyOnGroup(group: OISymbolGroup, center: TPoint, angleRad: number): OISymbolGroup;
    applyToSymbol(symbol: TOISymbol, center: TPoint, angleRad: number): TOISymbol;
    setTransformOrigin(id: string, originX: number, originY: number): void;
    rotateElement(id: string, degree: number): void;
    start(target: Element, origin: TPoint): void;
    continue(point: TPoint): number;
    end(point: TPoint): Promise<void>;
}

/**
 * @group Manager
 */
declare class OISelectionManager {
    #private;
    startSelectionPoint?: TPoint;
    endSelectionPoint?: TPoint;
    selectedGroup?: SVGGElement;
    behaviors: OIBehaviors;
    constructor(behaviors: OIBehaviors);
    get model(): OIModel;
    get renderer(): OISVGRenderer;
    get internalEvent(): InternalEvent;
    get rotator(): OIRotationManager;
    get translator(): OITranslateManager;
    get resizer(): OIResizeManager;
    get selectionBox(): Box | undefined;
    drawSelectingRect(box: TBoundingBox): void;
    clearSelectingRect(): void;
    protected getPoint(ev: PointerEvent): TPoint;
    protected createTranslateRect(box: TBoundingBox): SVGRectElement;
    protected createRotateGroup(box: TBoundingBox): SVGGElement;
    protected createResizeGroup(box: TBoundingBox): SVGGElement;
    protected createInteractElementsGroup(symbols: TOISymbol[]): SVGGElement | undefined;
    drawSelectedGroup(symbols: TOISymbol[]): void;
    resetSelectedGroup(symbols: TOISymbol[]): void;
    removeSelectedGroup(): void;
    hideInteractElements(): void;
    showInteractElements(): void;
    start(point: TPoint): void;
    continue(point: TPoint): TOISymbol[];
    end(point: TPoint): TOISymbol[];
}

/**
 * @group Snap
 */
type TSnapNudge = TPoint;
/**
 * @group Snap
 */
type TSnapLineInfos = {
    nudge: TSnapNudge;
    verticales: TSegment[];
    horizontales: TSegment[];
};
/**
 * @group Manager
 */
declare class OISnapManager {
    #private;
    behaviors: OIBehaviors;
    snapToGrid: boolean;
    snapToElement: boolean;
    snapAngle: number;
    constructor(behaviors: OIBehaviors, options?: {
        grid?: boolean;
        element?: boolean;
        angle?: number;
    });
    get model(): OIModel;
    get renderer(): OISVGRenderer;
    get selectionSnapPoints(): TPoint[];
    get otherSnapPoints(): TPoint[];
    get snapThreshold(): number;
    protected getNearestVerticalGuide(x: number): number;
    protected getNearestHorizontalGuide(y: number): number;
    protected getGuidePointToSnap(point: TPoint): TPoint;
    drawSnapToElementLines(lines: TSegment[]): void;
    clearSnapToElementLines(): void;
    protected getSnapLinesInfos(sourcePoints: TPoint[], targetPoints: TPoint[]): TSnapLineInfos;
    snapResize(point: TPoint, horizontal?: boolean, vertical?: boolean): TPoint;
    snapTranslate(tx: number, ty: number): TSnapNudge;
    snapRotation(angleDegree: number): number;
}

/**
 * @group Manager
 */
declare class OIWriteManager {
    #private;
    behaviors: OIBehaviors;
    detectGesture: boolean;
    currentSymbolOrigin?: TPoint;
    constructor(behaviors: OIBehaviors);
    get tool(): WriteTool;
    set tool(wt: WriteTool);
    get model(): OIModel;
    get renderer(): OISVGRenderer;
    get history(): OIHistoryManager;
    get gestureManager(): OIGestureManager;
    get snaps(): OISnapManager;
    get recognizer(): OIRecognizer;
    protected needContextLessGesture(stroke: OIStroke): boolean;
    protected createCurrentSymbol(pointer: TPointer, style: TStyle, pointerType: string): TOISymbol;
    protected updateCurrentSymbolShape(pointer: TPointer): void;
    protected updateCurrentSymbolEdge(pointer: TPointer): void;
    protected updateCurrentSymbol(pointer: TPointer): TOISymbol;
    start(style: TStyle, pointer: TPointer, pointerType: string): void;
    continue(pointer: TPointer): void;
    protected interactWithBackend(stroke: OIStroke): Promise<void>;
    end(pointer: TPointer): Promise<void>;
}

/**
 * @group Manager
 */
declare class OIEraseManager {
    #private;
    behaviors: OIBehaviors;
    currentEraser?: OIEraser;
    constructor(behaviors: OIBehaviors);
    get model(): OIModel;
    get renderer(): OISVGRenderer;
    start(pointer: TPointer): void;
    continue(pointer: TPointer): void;
    end(pointer: TPointer): Promise<void>;
}

/**
 * @group Manager
 */
declare class OIDebugSVGManager {
    #private;
    behaviors: OIBehaviors;
    constructor(behaviors: OIBehaviors);
    get model(): OIModel;
    get renderer(): OISVGRenderer;
    get snapPointsVisibility(): boolean;
    set snapPointsVisibility(show: boolean);
    get verticesVisibility(): boolean;
    set verticesVisibility(show: boolean);
    get boundingBoxVisibility(): boolean;
    set boundingBoxVisibility(show: boolean);
    get recognitionBoxVisibility(): boolean;
    set recognitionBoxVisibility(show: boolean);
    get recognitionItemBoxVisibility(): boolean;
    set recognitionItemBoxVisibility(show: boolean);
    protected showSnapPoints(): void;
    protected hideSnapPoints(): void;
    debugSnapPoints(): void;
    protected showVertices(): void;
    protected hideVertices(): void;
    debugVertices(): void;
    protected drawBoundingBox(symbols: TOISymbol[]): void;
    protected showBoundingBox(): void;
    protected hideBoundingBox(): void;
    debugBoundingBox(): void;
    protected drawRecognitionBox(box: TBoundingBox, infos?: string[]): void;
    protected showRecognitionBox(): Promise<void>;
    protected clearRecognitionBox(): void;
    debugRecognitionBox(): Promise<void>;
    protected drawRecognitionItemBox(box: TBoundingBox, label?: string, chars?: string[]): void;
    protected showRecognitionItemBox(): Promise<void>;
    protected clearRecognitionItemBox(): void;
    debugRecognitionItemBox(): Promise<void>;
    apply(): void;
}

/**
 * @group Menu
 */
type TMenuItem = {
    id: string;
    label: string;
    type: "button" | "checkbox" | "select" | "list" | "colors";
    disabled?: boolean;
};
/**
 * @group Menu
 */
type TMenuItemButton = TMenuItem & {
    type: "button";
    tooltip?: {
        label: string;
        position: "top" | "left" | "right" | "bottom";
    };
    icon?: string;
    callback: () => void;
};
/**
 * @group Menu
 */
type TMenuItemButtonList = TMenuItem & {
    type: "list";
    tooltip?: {
        label: string;
        position: "top" | "left" | "right" | "bottom";
    };
    initValue: string;
    values: {
        label: string;
        value: string;
    }[];
    callback: (value: string) => void;
};
/**
 * @group Menu
 */
type TMenuItemColorList = TMenuItem & {
    type: "colors";
    tooltip?: {
        label: string;
        position: "top" | "left" | "right" | "bottom";
    };
    initValue: string;
    values: string[];
    fill: boolean;
    callback: (value: string) => void;
};
/**
 * @group Menu
 */
type TMenuItemBoolean = TMenuItem & {
    type: "checkbox";
    initValue: boolean | "indeterminate";
    callback: (value: boolean) => void;
};
/**
 * @group Menu
 */
type TMenuItemSelect = TMenuItem & {
    type: "select";
    initValue: string;
    values: {
        label: string;
        value: string;
    }[];
    callback: (value: string) => void;
};
/**
 * @group Menu
 */
declare abstract class OIMenu {
    thicknessList: {
        label: string;
        value: number;
    }[];
    fontSizeList: {
        label: string;
        value: number;
    }[];
    fontWeightList: ({
        label: string;
        value: undefined;
    } | {
        label: string;
        value: string;
    })[];
    colors: string[];
    protected createToolTip(el: HTMLElement, text: string, position?: "top" | "left" | "right" | "bottom"): HTMLElement;
    protected createWrapCollapsible(el: Node, title: string): HTMLDivElement;
    protected createSeparatorHorizontal(): HTMLHRElement;
    protected createSeparatorVertical(): HTMLHRElement;
    protected createMenuItemBoolean(item: TMenuItemBoolean): HTMLDivElement;
    protected createMenuItemSelect(item: TMenuItemSelect): HTMLDivElement;
    protected createMenuItemButton(item: TMenuItemButton): HTMLElement;
    protected createMenuItemButtonList(item: TMenuItemButtonList): HTMLElement;
    protected createMenuItemColorList(item: TMenuItemColorList): HTMLDivElement;
    protected createColorList(item: TMenuItemColorList): HTMLDivElement;
    protected createMenuItem(item: TMenuItem): HTMLElement;
    abstract render(domElement: HTMLElement): void;
    abstract update(): void;
    abstract show(): void;
    abstract hide(): void;
    abstract destroy(): void;
}

/**
 * @group Menu
 */
type TSubMenuParam = {
    trigger: HTMLElement;
    menuTitle?: string;
    subMenu: HTMLElement;
    position: "top" | "left" | "right" | "right-top" | "bottom" | "bottom-left" | "bottom-right";
};
declare class OIMenuSub {
    element: HTMLDivElement;
    content: HTMLElement;
    constructor(param: TSubMenuParam);
    open(): void;
    close(): void;
    toggle(): void;
    unwrap(): void;
    wrap(): void;
}

/**
 * @group Menu
 */
declare class OIMenuAction extends OIMenu {
    #private;
    behaviors: OIBehaviors;
    id: string;
    wrapper?: HTMLElement;
    menuLanguage: OIMenuSub;
    menuClear?: HTMLButtonElement;
    menuUndo?: HTMLButtonElement;
    menuRedo?: HTMLButtonElement;
    menuConvert?: HTMLButtonElement;
    guideGaps: {
        label: string;
        value: string;
    }[];
    constructor(behaviors: OIBehaviors, id?: string);
    get model(): OIModel;
    get isMobile(): boolean;
    protected createMenuClear(): HTMLElement;
    protected createMenuLanguage(): HTMLElement;
    protected createMenuUndo(): HTMLElement;
    protected createMenuRedo(): HTMLElement;
    protected createMenuConvert(): HTMLElement;
    protected createMenuGesture(): HTMLDivElement;
    protected createMenuGuide(): HTMLDivElement;
    protected createMenuSnap(): HTMLDivElement;
    protected createMenuDebug(): HTMLDivElement;
    protected createMenuExport(): HTMLElement;
    protected readFileAsText(file: File): Promise<string>;
    protected createMenuImport(): HTMLElement;
    protected unselectAll(): void;
    protected closeAllSubMenu(): void;
    render(layer: HTMLElement): void;
    update(): void;
    show(): void;
    hide(): void;
    destroy(): void;
}

/**
 * @group Menu
 */
declare class OIMenuIntention extends OIMenu {
    #private;
    behaviors: OIBehaviors;
    id: string;
    wrapper?: HTMLDivElement;
    writeBtn?: HTMLButtonElement;
    menuSelect?: HTMLButtonElement;
    menuMove?: HTMLButtonElement;
    menuErase?: HTMLButtonElement;
    menuShape?: HTMLButtonElement;
    subMenuShape?: {
        rectangle: HTMLButtonElement;
        circle: HTMLButtonElement;
        triangle: HTMLButtonElement;
        ellipse: HTMLButtonElement;
        rhombus: HTMLButtonElement;
    };
    menuEdge?: HTMLButtonElement;
    subMenuEdge?: {
        line: HTMLButtonElement;
        arrow: HTMLButtonElement;
        doubleArrow: HTMLButtonElement;
    };
    constructor(behaviors: OIBehaviors, id?: string);
    protected createMenuWrite(): HTMLElement;
    protected createMenuMove(): HTMLElement;
    protected createMenuSelect(): HTMLElement;
    protected createMenuErase(): HTMLElement;
    protected createShapeSubMenu(icon: string, tool: WriteTool): HTMLButtonElement;
    protected createMenuShape(): HTMLElement;
    protected createEdgeSubMenu(square: string, tool: WriteTool): HTMLButtonElement;
    protected createMenuEdge(): HTMLElement;
    protected unselectAll(): void;
    update(): void;
    render(domElement: HTMLElement): void;
    show(): void;
    hide(): void;
    destroy(): void;
}

/**
 * @group Menu
 */
declare class OIMenuStyle extends OIMenu {
    #private;
    behaviors: OIBehaviors;
    id: string;
    wrapper?: HTMLDivElement;
    subMenu?: OIMenuSub;
    triggerBtn?: HTMLButtonElement;
    menuColorStroke?: HTMLDivElement;
    menuColorFill?: HTMLDivElement;
    menuThickness?: HTMLDivElement;
    menuFontSize?: HTMLDivElement;
    menuFontWeight?: HTMLDivElement;
    menuStrokeOpacity?: HTMLDivElement;
    constructor(behaviors: OIBehaviors, id?: string);
    get model(): OIModel;
    get symbolsSelected(): TOISymbol[];
    get writeShape(): boolean;
    get rowHeight(): number;
    get isMobile(): boolean;
    protected createMenuStroke(): HTMLDivElement;
    protected createMenuColorFill(): HTMLDivElement;
    protected createMenuThickness(): HTMLDivElement;
    protected createMenuFontSize(): HTMLDivElement;
    protected createMenuFontWeight(): HTMLDivElement;
    protected createMenuOpacity(): HTMLDivElement;
    render(layer: HTMLElement): void;
    update(): void;
    show(): void;
    hide(): void;
    destroy(): void;
}

/**
 * @group Menu
 */
declare class OIMenuContext extends OIMenu {
    #private;
    behaviors: OIBehaviors;
    id: string;
    wrapper?: HTMLElement;
    editMenu?: HTMLDivElement;
    editInput?: HTMLInputElement;
    editSaveBtn?: HTMLButtonElement;
    reorderMenu?: HTMLDivElement;
    decoratorMenu?: HTMLDivElement;
    menuExport?: HTMLDivElement;
    duplicateBtn?: HTMLButtonElement;
    groupBtn?: HTMLButtonElement;
    convertBtn?: HTMLButtonElement;
    removeBtn?: HTMLButtonElement;
    position: {
        x: number;
        y: number;
        scrollTop: number;
        scrollLeft: number;
    };
    constructor(behaviors: OIBehaviors, id?: string);
    get symbolsSelected(): TOISymbol[];
    get haveSymbolsSelected(): boolean;
    get symbolsDecorable(): (OIStroke | OIText | OISymbolGroup)[];
    get showDecorator(): boolean;
    protected createMenuEdit(): HTMLElement;
    protected createMenuDuplicate(): HTMLElement;
    protected createMenuGroup(): HTMLElement;
    protected createMenuConvert(): HTMLElement;
    protected createMenuRemove(): HTMLButtonElement;
    protected createMenuReorder(): HTMLElement;
    protected createDecoratorSubMenu(label: string, kind: DecoratorKind): HTMLElement;
    protected createMenuDecorator(): HTMLElement;
    protected createMenuExport(): HTMLElement;
    protected createMenuSelectAll(): HTMLElement;
    protected updateDecoratorSubMenu(): void;
    protected updateGroupMenu(): void;
    update(): void;
    render(domElement: HTMLElement): void;
    show(): void;
    hide(): void;
    destroy(): void;
}

/**
 * @group Manager
 */
declare class OIMenuManager {
    #private;
    behaviors: OIBehaviors;
    layer?: HTMLElement;
    action: OIMenuAction;
    intention: OIMenuIntention;
    context: OIMenuContext;
    style: OIMenuStyle;
    constructor(behaviors: OIBehaviors, custom?: PartialDeep<{
        style?: OIMenuStyle;
        intention?: OIMenuIntention;
        action?: OIMenuAction;
        context?: OIMenuContext;
    }>);
    render(layer: HTMLElement): void;
    update(): void;
    show(): void;
    hide(): void;
    destroy(): void;
}

/**
 * @group Manager
 */
declare class OIMoveManager {
    behaviors: OIBehaviors;
    origin?: {
        left: number;
        top: number;
        x: number;
        y: number;
    };
    constructor(behaviors: OIBehaviors);
    get renderer(): OISVGRenderer;
    start(evt: PointerEvent): void;
    continue(evt: PointerEvent): void;
    end(evt: PointerEvent): Promise<void>;
}

/**
 * @group Behavior
 * @remarks behaviors.menu, behaviors.gesture and fontStyle are only usable in the case of offscreen
 */
type TBehaviorOptions = {
    configuration: TConfiguration;
    behaviors?: {
        grabber?: IGrabber;
        recognizer?: RestRecognizer | WSRecognizer | OIRecognizer;
        menu?: {
            style?: OIMenuStyle;
            intention?: OIMenuIntention;
            action?: OIMenuAction;
        };
        gesture?: {
            surround?: SurroundAction;
            strikeThrough?: StrikeThroughAction;
            insert?: InsertAction;
        };
        snap?: {
            grid?: boolean;
            element?: boolean;
            angle?: number;
        };
    };
    penStyle?: TStyle;
    fontStyle?: {
        size?: number;
        weight?: "bold" | "normal";
    };
    theme?: TTheme;
    logger?: TLoggerConfiguration;
};

/**
 * @group Behavior
 */
declare class OIBehaviors implements IBehaviors {
    #private;
    name: string;
    layerInfos: HTMLDivElement;
    grabber: OIPointerEventGrabber;
    renderer: OISVGRenderer;
    recognizer: OIRecognizer;
    styler: StyleManager;
    history: OIHistoryManager;
    writer: OIWriteManager;
    eraser: OIEraseManager;
    gesture: OIGestureManager;
    resizer: OIResizeManager;
    rotator: OIRotationManager;
    translator: OITranslateManager;
    converter: OIConversionManager;
    texter: OITextManager;
    selector: OISelectionManager;
    svgDebugger: OIDebugSVGManager;
    snaps: OISnapManager;
    move: OIMoveManager;
    menu: OIMenuManager;
    constructor(options: PartialDeep<TBehaviorOptions>, layerInfos: HTMLDivElement);
    get internalEvent(): InternalEvent;
    get intention(): Intention;
    set intention(i: Intention);
    get model(): OIModel;
    get configuration(): TConfiguration;
    set renderingConfiguration(renderingConfiguration: TRenderingConfiguration);
    get currentPenStyle(): TStyle;
    get penStyle(): TStyle;
    setPenStyle(penStyle?: TStyle | undefined): Promise<void>;
    get penStyleClasses(): string;
    setPenStyleClasses(penStyleClasses?: string | undefined): Promise<void>;
    get theme(): TTheme;
    setTheme(theme?: TTheme): Promise<void>;
    updateLayerInfos(): void;
    protected onPointerDown(evt: PointerEvent, pointer: TPointer): void;
    protected onPointerMove(evt: PointerEvent, pointer: TPointer): void;
    protected onPointerUp(evt: PointerEvent, pointer: TPointer): Promise<void>;
    protected onContextMenu(el: HTMLElement, point: TPoint): Promise<void>;
    init(domElement: HTMLElement): Promise<void>;
    changeLanguage(code: string): Promise<void>;
    protected createShape(partialShape: PartialDeep<TOIShape>): TOIShape;
    protected createEdge(partialEdge: PartialDeep<TOIEdge>): TOIEdge;
    protected createGroup(partialGroup: PartialDeep<OISymbolGroup>): OISymbolGroup;
    protected createStroke(partialSymbol: PartialDeep<OIStroke>): OIStroke;
    protected createText(partialSymbol: PartialDeep<OIText>): OIText;
    createSymbol(partialSymbol: PartialDeep<TOISymbol>): Promise<TOISymbol>;
    createSymbols(partialSymbols: PartialDeep<TOISymbol>[]): Promise<TOISymbol[]>;
    addSymbol(sym: TOISymbol, addToHistory?: boolean): Promise<TOISymbol>;
    addSymbols(symList: TOISymbol[], addToHistory?: boolean): Promise<TOISymbol[]>;
    updateSymbol(sym: TOISymbol, addToHistory?: boolean): Promise<TOISymbol>;
    updateSymbols(symList: TOISymbol[], addToHistory?: boolean): Promise<TOISymbol[]>;
    updateSymbolsStyle(symbolIds: string[], style: TStyle, addToHistory?: boolean): void;
    updateTextFontStyle(textIds: string[], { fontSize, fontWeight }: {
        fontSize?: number;
        fontWeight?: "normal" | "bold";
    }): void;
    replaceSymbols(oldSymbols: TOISymbol[], newSymbols: TOISymbol[], addToHistory?: boolean): Promise<void>;
    changeOrderSymbol(symbol: TOISymbol, position: "first" | "last" | "forward" | "backward"): void;
    changeOrderSymbols(symbols: TOISymbol[], position: "first" | "last" | "forward" | "backward"): void;
    groupSymbols(symbols: TOISymbol[]): OISymbolGroup;
    ungroupSymbol(group: OISymbolGroup): TOISymbol[];
    groupStrokesByJIIXElement(): Promise<void>;
    removeSymbol(id: string, addToHistory?: boolean): Promise<void>;
    removeSymbols(ids: string[], addToHistory?: boolean): Promise<TOISymbol[]>;
    select(ids: string[]): void;
    selectAll(): void;
    unselectAll(): void;
    importPointEvents(partialStrokes: PartialDeep<OIStroke>[]): Promise<OIModel>;
    protected triggerDownload(fileName: string, urlData: string): void;
    getSymbolsBounds(symbols: TOISymbol[], margin?: 10): Box;
    protected buildBlobFromSymbols(symbols: TOISymbol[], box: Box): Blob;
    protected getExportName(extension: string): string;
    downloadAsSVG(selection?: boolean): void;
    downloadAsPNG(selection?: boolean): void;
    downloadAsJson(selection?: boolean): void;
    extractStrokesFromSymbols(symbols: TOISymbol[] | undefined): OIStroke[];
    protected extractBackendChanges(changes: TOIHistoryChanges): TOIHistoryBackendChanges;
    undo(): Promise<OIModel>;
    redo(): Promise<OIModel>;
    export(mimeTypes?: string[]): Promise<OIModel>;
    convert(): Promise<OIModel>;
    resize(height: number, width: number): Promise<OIModel>;
    clear(): Promise<OIModel>;
    destroy(): Promise<void>;
}

/**
 * @group Behavior
 */
declare class RestBehaviors implements IBehaviors {
    #private;
    name: string;
    grabber: PointerEventGrabber;
    renderer: CanvasRenderer;
    recognizer: RestRecognizer;
    history: HistoryManager;
    styleManager: StyleManager;
    intention: Intention;
    constructor(options: PartialDeep<TBehaviorOptions>);
    protected onPointerDown(evt: PointerEvent, point: TPointer): void;
    protected onPointerMove(_evt: PointerEvent, point: TPointer): void;
    protected onPointerUp(_evt: PointerEvent, point: TPointer): Promise<void>;
    get internalEvent(): InternalEvent;
    get model(): Model;
    get currentPenStyle(): TPenStyle;
    get penStyle(): TPenStyle;
    setPenStyle(penStyle?: TPenStyle | undefined): Promise<void>;
    get penStyleClasses(): string;
    setPenStyleClasses(penStyleClasses?: string | undefined): Promise<void>;
    get theme(): TTheme;
    setTheme(theme?: PartialDeep<TTheme>): Promise<void>;
    get configuration(): TConfiguration;
    init(domElement: HTMLElement): Promise<void>;
    drawCurrentStroke(): void;
    updateModelRendering(): Promise<IModel>;
    export(mimeTypes?: string[]): Promise<IModel>;
    convert(conversionState?: TConverstionState, requestedMimeTypes?: string[]): Promise<IModel>;
    importPointEvents(strokes: PartialDeep<TStroke>[]): Promise<IModel>;
    resize(height: number, width: number): Promise<IModel>;
    undo(): Promise<IModel>;
    redo(): Promise<IModel>;
    clear(): Promise<IModel>;
    destroy(): Promise<void>;
}

/**
 * @group Behavior
 */
declare class WSBehaviors implements IBehaviors {
    #private;
    name: string;
    grabber: PointerEventGrabber;
    renderer: WSSVGRenderer;
    recognizer: WSRecognizer;
    history: HistoryManager;
    styleManager: StyleManager;
    intention: Intention;
    constructor(options: PartialDeep<TBehaviorOptions>);
    get internalEvent(): InternalEvent;
    get model(): Model;
    get configuration(): TConfiguration;
    get currentPenStyle(): TPenStyle;
    get penStyle(): TPenStyle;
    setPenStyle(penStyle?: PartialDeep<TPenStyle>): Promise<void>;
    get penStyleClasses(): string;
    setPenStyleClasses(penClass?: string): Promise<void>;
    get theme(): TTheme;
    setTheme(theme?: PartialDeep<TTheme>): Promise<void>;
    protected onExport(exports: TExport): void;
    protected onPointerDown(evt: PointerEvent, point: TPointer): void;
    protected onPointerMove(_evt: PointerEvent, point: TPointer): void;
    protected onPointerUp(_evt: PointerEvent, point: TPointer): Promise<void>;
    protected onSVGPatch(evt: TWSMessageEventSVGPatch): void;
    init(domElement: HTMLElement): Promise<void>;
    drawCurrentStroke(): void;
    synchronizeModelWithBackend(): Promise<IModel>;
    waitForIdle(): Promise<void>;
    export(mimeTypes?: string[]): Promise<IModel>;
    convert(conversionState?: TConverstionState): Promise<IModel>;
    import(data: Blob, mimeType?: string): Promise<IModel>;
    importPointEvents(strokes: PartialDeep<TStroke>[]): Promise<IModel>;
    resize(height: number, width: number): Promise<IModel>;
    undo(): Promise<IModel>;
    redo(): Promise<IModel>;
    clear(): Promise<IModel>;
    destroy(): Promise<void>;
}

/**
 * @group Editor
 */
type HTMLEditorElement = HTMLElement & {
    editor: Editor;
};
/**
 * @group Editor
 */
declare class Editor {
    #private;
    logger: Logger;
    wrapperHTML: HTMLEditorElement;
    constructor(wrapperHTML: HTMLElement, options: PartialDeep<TBehaviorOptions>, globalClassCss?: string);
    get loggerConfiguration(): TLoggerConfiguration;
    set loggerConfiguration(loggerConfig: TLoggerConfiguration);
    get initializationPromise(): Promise<void>;
    get model(): IModel;
    get behaviors(): IBehaviors;
    get configuration(): TConfiguration;
    set configuration(configuration: TConfiguration);
    get intention(): Intention;
    set intention(i: Intention);
    get events(): PublicEvent;
    get internalEvents(): InternalEvent;
    get context(): TUndoRedoContext;
    get grabber(): IGrabber;
    get currentPenStyle(): TPenStyle;
    get penStyle(): TPenStyle;
    set penStyle(ps: PartialDeep<TPenStyle>);
    get theme(): TTheme;
    set theme(theme: PartialDeep<TTheme>);
    get penStyleClasses(): string;
    set penStyleClasses(styleClasses: string);
    closeMessageModal(): Promise<void>;
    showError(err: Error | string): void;
    showNotif(notif: {
        message: string;
        timeout?: number;
    }): void;
    initialize(): Promise<void>;
    waitForIdle(): Promise<void>;
    undo(): Promise<IModel>;
    redo(): Promise<IModel>;
    clear(): Promise<IModel>;
    resize(): Promise<IModel>;
    export(mimeTypes?: string[]): Promise<IModel>;
    convert(params?: {
        conversionState?: TConverstionState;
        mimeTypes?: string[];
    }): Promise<IModel | never>;
    import(data: Blob | string | TJIIXExport, mimeType?: string): Promise<IModel | never>;
    importPointEvents(strokes: PartialDeep<TStroke>[]): Promise<IModel>;
}

/**
 * @group SmartGuide
 */
declare class SmartGuide {
    #private;
    uuid: string;
    margin: TMarginConfiguration;
    renderingConfiguration: TRenderingConfiguration;
    jiix?: TJIIXExport;
    lastWord?: TJIIXWord;
    wordToChange?: TJIIXWord;
    constructor();
    get internalEvent(): InternalEvent;
    init(domElement: HTMLElement, margin: TMarginConfiguration, renderingConfiguration: TRenderingConfiguration): void;
    resize(): void;
    update(exports: TJIIXExport): void;
    clear(): void;
    destroy(): void;
}

export { Box, CanvasRenderer, CanvasRendererShape, CanvasRendererStroke, CanvasRendererText, Configuration, DecoratorKind, DefaultConfiguration, DefaultConvertionConfiguration, DefaultDebugConfiguration, DefaultDiagramConfiguration, DefaultDiagramConvertConfiguration, DefaultEraserConfiguration, DefaultExportConfiguration, DefaultGrabberConfiguration, DefaultGuidesConfiguration, DefaultJiixConfiguration, DefaultListenerConfiguration, DefaultLoggerConfiguration, DefaultMarginConfiguration, DefaultMathConfiguration, DefaultMathUndoRedoConfiguration, DefaultMenuConfiguration, DefaultPenStyle, DefaultRawContentConfiguration, DefaultRecognitionConfiguration, DefaultRecognitionRendererConfiguration, DefaultRenderingConfiguration, DefaultServerConfiguration, DefaultSmartGuidesConfiguration, DefaultSolverConfiguration, DefaultStyle, DefaultTextConfiguration, DefaultTextGuidesConfiguration, DefaultTheme, DefaultTriggerConfiguration, DefaultUndoRedoConfiguration, DeferredPromise, EdgeDecoration, EdgeKind, Editor, EventType, ExportType, type HTMLEditorElement, HistoryManager, type IBehaviors, type IGrabber, type IHistoryManager, type IModel, InsertAction, Intention, InternalEvent, InternalEventType, JIIXELementType, JIIXEdgeKind, JIIXNodeKind, Logger, LoggerClass, LoggerLevel, LoggerManager, MatrixTransform, Model, OIBehaviors, OIConversionManager, OIDebugSVGManager, OIDecorator, OIEdgeArc, OIEdgeBase, OIEdgeLine, OIEdgePolyLine, OIEraseManager, OIEraser, OIGestureManager, OIHistoryManager, OIMenu, OIMenuAction, OIMenuContext, OIMenuIntention, OIMenuManager, OIMenuStyle, OIMenuSub, OIModel, OIMoveManager, OIPointerEventGrabber, OIRecognizer, OIResizeManager, OIRotationManager, OISVGRenderer, OISVGRendererConst, OISVGRendererDecoratorUtil, OISVGRendererEdgeUtil, OISVGRendererEraserUtil, OISVGRendererGroupUtil, OISVGRendererShapeUtil, OISVGRendererStrokeUtil, OISVGRendererTextUtil, OISelectionManager, OIShapeBase, OIShapeCircle, OIShapeEllipse, OIShapePolygon, OISnapManager, OIStroke, OISymbolBase, OISymbolGroup, OIText, OITextManager, OITranslateManager, OIWriteManager, type PartialDeep, PointerEventGrabber, PublicEvent, RecognizerError, ResizeDirection, RestBehaviors, RestRecognizer, SELECTION_MARGIN, SVGBuilder, SVGStroker, ShapeKind, SmartGuide, StrikeThroughAction, Stroke, StyleHelper, StyleManager, SurroundAction, SvgElementRole, SymbolType, type TAngleUnit, type TBehaviorOptions, type TBoundingBox, type TBox, type TCanvasShapeEllipseSymbol, type TCanvasShapeLineSymbol, type TCanvasShapeTableLineSymbol, type TCanvasShapeTableSymbol, type TCanvasTextSymbol, type TCanvasTextUnderlineSymbol, type TCanvasUnderLineSymbol, type TConfiguration, type TConverstionState, type TConvertionConfiguration, type TDiagramConfiguration, type TDiagramConvertConfiguration, type TEraserConfiguration, type TExport, type TExportConfiguration, type TGesture, type TGestureType, type TGrabberConfiguration, type TGuidesConfiguration, type TImageConfiguration, type TImageViewportConfiguration, type TJIIXBase, type TJIIXChar, type TJIIXEdgeArc, type TJIIXEdgeElement, type TJIIXEdgeElementBase, type TJIIXEdgeLine, type TJIIXEdgePolyEdge, type TJIIXElement, type TJIIXElementBase, type TJIIXExport, type TJIIXNodeCircle, type TJIIXNodeElement, type TJIIXNodeElementBase, type TJIIXNodeEllipse, type TJIIXNodeParrallelogram, type TJIIXNodePolygon, type TJIIXNodeRectangle, type TJIIXNodeRhombus, type TJIIXNodeTriangle, type TJIIXStrokeItem, type TJIIXTextElement, type TJIIXWord, type TJiixConfiguration, type TListenerConfiguration, type TLoggerConfiguration, type TMarginConfiguration, type TMathConfiguration, type TMathMLExport, type TMathMLFlavor, type TMathUndoRedoConfiguration, type TMatrixTransform, type TMenuConfiguration, type TMenuItem, type TMenuItemBoolean, type TMenuItemButton, type TMenuItemButtonList, type TMenuItemColorList, type TMenuItemSelect, type TOIEdge, type TOIHistoryBackendChanges, type TOIHistoryChanges, type TOIHistoryStackItem, type TOIMessage, type TOIMessageEvent, type TOIMessageEventAuthenticated, type TOIMessageEventContentChange, type TOIMessageEventContextlessGesture, type TOIMessageEventError, type TOIMessageEventExport, type TOIMessageEventGesture, type TOIMessageEventHMACChallenge, type TOIMessageEventIdle, type TOIMessageEventNewPart, type TOIMessageEventPartChange, type TOIMessageEventPong, type TOIMessageReceived, TOIMessageType, type TOISessionDescriptionMessage, type TOIShape, type TOISymbol, type TOISymbolChar, type TPenStyle, type TPoint, type TPointer, type TProtocol, type TRawContentConfiguration, type TRecognitionConfiguration, type TRecognitionPositions, type TRecognitionRendererConfiguration, type TRecognitionRendererDebugConfiguration, type TRecognitionType, type TRenderingConfiguration, type TRestPostConfiguration, type TRestPostData, type TRoundingMode, type TSchene, type TSegment, type TServerConfiguration, type TSmartGuidesConfiguration, type TSnapLineInfos, type TSnapNudge, type TSolverConfiguration, type TSolverOptions, type TStroke, type TStrokeGroup, type TStrokeGroupToSend, type TStrokeToSend, type TStyle, type TSubMenuParam, type TSymbol, type TTextConfConfiguration, type TTextConfiguration, type TTextGuidesConfiguration, type TTheme, type TThemeMath, type TThemeMathSolved, type TThemeText, type TTriggerConfiguration, type TUndoRedoConfiguration, type TUndoRedoContext, type TUndoRedoMode, type TUpdatePatch, type TUpdatePatchAppendChild, type TUpdatePatchInsertBefore, type TUpdatePatchRemoveAttribut, type TUpdatePatchRemoveChild, type TUpdatePatchRemoveElement, type TUpdatePatchReplaceAll, type TUpdatePatchReplaceELement, type TUpdatePatchSetAttribut, type TUpdatePatchType, type TWSMessageEvent, type TWSMessageEventContentChange, type TWSMessageEventContentPackageDescriptionMessage, type TWSMessageEventError, type TWSMessageEventExport, type TWSMessageEventHMACChallenge, type TWSMessageEventPartChange, type TWSMessageEventSVGPatch, WSBehaviors, WSRecognizer, WSSVGRenderer, WriteTool, computeAngleAxeRadian, computeAngleRadian, computeAverage, computeDistance, computeDistanceBetweenPointAndSegment, computeHmac, computeLinksPointers, computeMiddlePointer, computeNearestPointOnSegment, computePointOnEllipse, computeRotatedPoint, convertBoundingBoxMillimeterToPixel, convertDegreeToRadian, convertMillimeterToPixel, convertPartialStrokesToOIStrokes, convertPartialStrokesToStrokes, convertPixelToMillimeter, convertRadianToDegree, createPointsOnSegment, createUUID, findIntersectBetweenSegmentAndCircle, findIntersectionBetween2Segment, getAvailableFontList, getAvailableLanguageList, getClosestPoint, getClosestPoints, getInitialUndoRedoContext, isBetween, isPointInsideBox, isPointInsidePolygon, isValidNumber, isValidPoint, isVersionSuperiorOrEqual, mergeDeep, scalaire };
//# sourceMappingURL=iink.d.ts.map
