"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var RadioGroupComponent = (function () {
    function RadioGroupComponent(_element, _applicationRef) {
        this._element = _element;
        this._applicationRef = _applicationRef;
        this.valueChange = new core_1.EventEmitter();
        this.radioButtons = [];
    }
    RadioGroupComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var i = 0;
        var max = this._element.nativeElement.getChildrenCount();
        while (i < max) {
            if (typeof this._element.nativeElement.getChildAt(i).checked !== 'undefined') {
                this.radioButtons.push(this._element.nativeElement.getChildAt(i));
            }
            i++;
        }
        this._element.nativeElement.on('propertyChange', function (res) {
            if (res.propertyName === 'checkedButton') {
                _this.getNewSelectedBox();
            }
        });
    };
    RadioGroupComponent.prototype.getNewSelectedBox = function () {
        var i = 0;
        var max = this.radioButtons.length;
        while (i < max) {
            if (this.radioButtons[i].checked === true) {
                this.valueChange.emit(i);
                this._applicationRef.tick();
            }
            i++;
        }
    };
    RadioGroupComponent.prototype.setBoxToSelected = function (index) {
        this.radioButtons[index].checked = true;
    };
    RadioGroupComponent.prototype.ngOnChanges = function (changes) {
        if (changes.hasOwnProperty('value')) {
            if (typeof changes['value'].currentValue !== 'undefined') {
                this.setBoxToSelected(changes['value'].currentValue);
            }
        }
    };
    return RadioGroupComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], RadioGroupComponent.prototype, "value", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RadioGroupComponent.prototype, "valueChange", void 0);
RadioGroupComponent = __decorate([
    core_1.Component({
        selector: "RadioGroup",
        template: "<ng-content></ng-content>",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        styles: []
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.ApplicationRef])
], RadioGroupComponent);
exports.RadioGroupComponent = RadioGroupComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW9ncm91cC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYWRpb2dyb3VwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUd1QjtBQWF2QixJQUFhLG1CQUFtQjtJQVc1Qiw2QkFDWSxRQUFvQixFQUNwQixlQUErQjtRQUQvQixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQVBwQyxnQkFBVyxHQUF5QixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUd0RCxpQkFBWSxHQUFrQixFQUFFLENBQUM7SUFNekMsQ0FBQztJQUVELDZDQUFlLEdBQWY7UUFBQSxpQkFrQkM7UUFoQkcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV6RCxPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUcsQ0FBQztZQUNkLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUMzRSxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RSxDQUFDO1lBQ0QsQ0FBQyxFQUFFLENBQUM7UUFDUixDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLFVBQUMsR0FBdUI7WUFDckUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUN2QyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUM3QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFUCxDQUFDO0lBRUQsK0NBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFFbkMsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFHLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNoQyxDQUFDO1lBQ0QsQ0FBQyxFQUFFLENBQUM7UUFDUixDQUFDO0lBQ0wsQ0FBQztJQUVELDhDQUFnQixHQUFoQixVQUFpQixLQUFhO1FBQzFCLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUM1QyxDQUFDO0lBRUQseUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3pELENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQztJQUNMLDBCQUFDO0FBQUQsQ0FBQyxBQTdERCxJQTZEQztBQTFERztJQURDLFlBQUssRUFBRTs7a0RBQ2E7QUFHckI7SUFEQyxhQUFNLEVBQUU7OEJBQ1csbUJBQVk7d0RBQThCO0FBTnJELG1CQUFtQjtJQVIvQixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFLDJCQUEyQjtRQUNyQyxlQUFlLEVBQUUsOEJBQXVCLENBQUMsTUFBTTtRQUMvQyxNQUFNLEVBQUUsRUFDUDtLQUNKLENBQUM7cUNBY3dCLGlCQUFVO1FBQ0gscUJBQWM7R0FibEMsbUJBQW1CLENBNkQvQjtBQTdEWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIEVsZW1lbnRSZWYsIEFmdGVyVmlld0luaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLFxuICAgIFNpbXBsZUNoYW5nZXMsIEFwcGxpY2F0aW9uUmVmXG59IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQcm9wZXJ0eUNoYW5nZURhdGEgfSBmcm9tICdkYXRhL29ic2VydmFibGUnO1xuaW1wb3J0IHsgUmFkaW9CdXR0b24gfSBmcm9tICcuLi8nO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIlJhZGlvR3JvdXBcIixcbiAgICB0ZW1wbGF0ZTogXCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XCIsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgc3R5bGVzOiBbXG4gICAgXVxufSlcblxuZXhwb3J0IGNsYXNzIFJhZGlvR3JvdXBDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0ICwgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpXG4gICAgcHVibGljIHZhbHVlOiBudW1iZXI7XG5cbiAgICBAT3V0cHV0KClcbiAgICBwdWJsaWMgdmFsdWVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG5cbiAgICBwcml2YXRlIHJhZGlvQnV0dG9uczogUmFkaW9CdXR0b25bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXG4gICAgICAgIHByaXZhdGUgX2FwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZlxuICAgICkge1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcblxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGxldCBtYXggPSB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Q2hpbGRyZW5Db3VudCgpO1xuXG4gICAgICAgIHdoaWxlKCBpIDwgbWF4ICkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZ2V0Q2hpbGRBdChpKS5jaGVja2VkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmFkaW9CdXR0b25zLnB1c2godGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmdldENoaWxkQXQoaSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50Lm9uKCdwcm9wZXJ0eUNoYW5nZScsIChyZXM6IFByb3BlcnR5Q2hhbmdlRGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlcy5wcm9wZXJ0eU5hbWUgPT09ICdjaGVja2VkQnV0dG9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZ2V0TmV3U2VsZWN0ZWRCb3goKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG5cbiAgICBnZXROZXdTZWxlY3RlZEJveCgpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBsZXQgbWF4ID0gdGhpcy5yYWRpb0J1dHRvbnMubGVuZ3RoO1xuXG4gICAgICAgIHdoaWxlKCBpIDwgbWF4ICkge1xuICAgICAgICAgICAgaWYgKHRoaXMucmFkaW9CdXR0b25zW2ldLmNoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlQ2hhbmdlLmVtaXQoaSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXBwbGljYXRpb25SZWYudGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Qm94VG9TZWxlY3RlZChpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucmFkaW9CdXR0b25zW2luZGV4XS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCd2YWx1ZScpKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGNoYW5nZXNbJ3ZhbHVlJ10uY3VycmVudFZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0Qm94VG9TZWxlY3RlZChjaGFuZ2VzWyd2YWx1ZSddLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=