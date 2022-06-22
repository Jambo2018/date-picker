import { isInRange } from '../utils/dateUtil';
import type { GenerateConfig } from '../generate';
import type { RangeValue, NullableDateType } from '../interface';
import { getValue } from '../utils/miscUtil';

export default function useCellClassName<DateType>({
  cellPrefixCls,
  generateConfig,
  rangedValue,
  hoverValue,
  isInView,
  isSameCell,
  // offsetCell,
  today,
  value,
  showHover = false,
}: {
  cellPrefixCls: string;
  generateConfig: GenerateConfig<DateType>;
  isSameCell: (
    current: NullableDateType<DateType>,
    target: NullableDateType<DateType>,
  ) => boolean;
  offsetCell: (date: DateType, offset: number) => DateType;
  isInView: (date: DateType) => boolean;
  rangedValue?: RangeValue<DateType>;
  hoverValue?: NullableDateType<DateType>;
  today?: NullableDateType<DateType>;
  value?: NullableDateType<DateType>;
  showHover?: boolean
}) {
  function getClassName(currentDate: DateType) {
    // const prevDate = offsetCell(currentDate, -1);
    // const nextDate = offsetCell(currentDate, 1);


    
    const rangeStart = getValue(rangedValue, 0);
    const rangeEnd = getValue(rangedValue, 1);

    const hoverStart = getValue(rangedValue, 0);
    const hoverEnd = getValue(rangedValue, 1);

    // console.log(isSameCell(value, currentDate), isSameCell(rangeStart, currentDate), isSameCell(rangeEnd, currentDate))

    const isRangeHovered = isInRange(
      generateConfig,
      rangeStart,
      rangeEnd,
      hoverValue,
      currentDate,
    );
    // console.log(showHover)
    function isRangeStart() {
      if (!rangeStart) return false;
      if (isSameCell(currentDate, rangeStart)) {
        if (!rangeEnd && hoverValue && generateConfig.isAfter(hoverValue, rangeStart))
          return true;
        else if (rangeEnd)
          return true;
      } else if (isSameCell(currentDate, hoverValue)) {
        if (!rangeEnd && hoverValue && generateConfig.isAfter(rangeStart, hoverValue))
          return true;
      }
      return false
    }
    function isRangeEnd() {
      if (!rangeStart) return false;
      if (!rangeEnd && hoverValue && isSameCell(currentDate, hoverValue)) {
        if (generateConfig.isAfter(hoverValue, rangeStart))
          return true;
      } else if (isSameCell(currentDate, rangeStart)) {
        if (!rangeEnd && hoverValue && generateConfig.isAfter(rangeStart, hoverValue))
          return true;
      } else if (rangeEnd && isSameCell(currentDate, rangeEnd)) {
        return true;
      }
      return false
    }



    // const isHoverStart = isSameCell(hoverStart, currentDate);
    // const isHoverEnd = isSameCell(hoverEnd, currentDate);

    // const isHoverEdgeStart =
    //   (isRangeHovered || isHoverEnd) &&
    //   (!isInView(prevDate) || isRangeEnd(prevDate));
    // const isHoverEdgeEnd =
    //   (isRangeHovered || isHoverStart) &&
    //   (!isInView(nextDate) || isRangeStart(nextDate));

    return {
      // In view
      [`${cellPrefixCls}-in-view`]: isInView(currentDate),
      [`${cellPrefixCls}-date-hover`]: !showHover,

      
      // ishover
      [`${cellPrefixCls}-hover`]: hoverValue && isSameCell(hoverValue, currentDate),


      // Range
      [`${cellPrefixCls}-in-range`]: isRangeHovered && showHover,
      [`${cellPrefixCls}-range-start`]: isRangeStart() && showHover,
      [`${cellPrefixCls}-range-end`]: isRangeEnd() && showHover,

      // [`${cellPrefixCls}-range-start`]: isRangeStart(currentDate) && showHover,
      // [`${cellPrefixCls}-range-end`]: isRangeEnd(currentDate) && showHover,
      // [`${cellPrefixCls}-range-start-single`]:
      //   isRangeStart(currentDate) && !rangeEnd,
      // [`${cellPrefixCls}-range-end-single`]:
      //   isRangeEnd(currentDate) && !rangeStart,
      // [`${cellPrefixCls}-range-start-near-hover`]:
      //   isRangeStart(currentDate) &&
      //   (isSameCell(prevDate, hoverStart) ||
      //     isInRange(generateConfig, hoverStart, hoverEnd, prevDate)),
      // [`${cellPrefixCls}-range-end-near-hover`]:
      //   isRangeEnd(currentDate) &&
      //   (isSameCell(nextDate, hoverEnd) ||
      //     isInRange(generateConfig, hoverStart, hoverEnd, nextDate)),

      // Range Hover
      // [`${cellPrefixCls}-range-hover`]: isRangeHovered && showHover,
      // [`${cellPrefixCls}-range-hover-start`]: isHoverStart && showHover,
      // [`${cellPrefixCls}-range-hover-end`]: isHoverEnd && showHover,

      // // Range Edge
      // [`${cellPrefixCls}-range-hover-edge-start`]: isHoverEdgeStart,
      // [`${cellPrefixCls}-range-hover-edge-end`]: isHoverEdgeEnd,
      // [`${cellPrefixCls}-range-hover-edge-start-near-range`]:
      //   isHoverEdgeStart && isSameCell(prevDate, rangeEnd),
      // [`${cellPrefixCls}-range-hover-edge-end-near-range`]:
      //   isHoverEdgeEnd && isSameCell(nextDate, rangeStart),

      // Others
      [`${cellPrefixCls}-today`]: isSameCell(today, currentDate),
      [`${cellPrefixCls}-selected`]: isSameCell(value, currentDate) || isSameCell(rangeStart, currentDate) || isSameCell(rangeEnd, currentDate),
    };
  }

  return getClassName;
}
