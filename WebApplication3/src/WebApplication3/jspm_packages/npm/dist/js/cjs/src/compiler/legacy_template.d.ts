import { HtmlAstVisitor, HtmlAttrAst, HtmlElementAst, HtmlTextAst, HtmlCommentAst, HtmlExpansionAst, HtmlExpansionCaseAst, HtmlAst } from './html_ast';
import { HtmlParser, HtmlParseTreeResult } from './html_parser';
/**
 * Convert templates to the case sensitive syntax
 *
 * @internal
 */
export declare class LegacyHtmlAstTransformer implements HtmlAstVisitor {
    private dashCaseSelectors;
    rewrittenAst: HtmlAst[];
    visitingTemplateEl: boolean;
    constructor(dashCaseSelectors?: string[]);
    visitComment(ast: HtmlCommentAst, context: any): any;
    visitElement(ast: HtmlElementAst, context: any): HtmlElementAst;
    visitAttr(originalAst: HtmlAttrAst, context: any): HtmlAttrAst;
    visitText(ast: HtmlTextAst, context: any): HtmlTextAst;
    visitExpansion(ast: HtmlExpansionAst, context: any): any;
    visitExpansionCase(ast: HtmlExpansionCaseAst, context: any): any;
    private _rewriteLongSyntax(ast);
    private _rewriteTemplateAttribute(ast);
    private _rewriteShortSyntax(ast);
    private _rewriteStar(ast);
    private _rewriteInterpolation(ast);
    private _rewriteSpecialCases(ast);
}
export declare class LegacyHtmlParser extends HtmlParser {
    parse(sourceContent: string, sourceUrl: string, parseExpansionForms?: boolean): HtmlParseTreeResult;
}
