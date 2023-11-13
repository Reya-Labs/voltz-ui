import { ColorTokens } from 'brokoli-ui';
import React from 'react';

import { fireEvent, render, screen } from '../../../../test-helpers';
import { ChartFilters, ChartFiltersProps } from '.';

// Create a mock function for the event handlers
const mockOnModeChange = jest.fn();
const mockOnTimeRangeChange = jest.fn();

// Define sample test data
const filterOptions = [
  {
    id: 'mode1',
    isMode: true,
    label: 'Mode 1',
    underlineColorToken: 'primary100' as ColorTokens,
  },
  {
    id: 'timeRange1',
    isMode: false,
    label: 'Time Range 1',
    underlineColorToken: 'primary100' as ColorTokens,
  },
];

const activeTimeRangeId = 'timeRange1';
const activeModeId = 'mode1';
const disabled = false;

// Create a utility function to render the ChartFilters component with the necessary props
const renderChartFilters = (props: Partial<ChartFiltersProps> = {}) => {
  const defaultProps: ChartFiltersProps = {
    filterOptions,
    activeTimeRangeId,
    activeModeId,
    disabled,
    onModeChange: mockOnModeChange,
    onTimeRangeChange: mockOnTimeRangeChange,
  };

  return render(<ChartFilters {...defaultProps} {...props} />);
};

describe('<ChartFilters />', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render the ChartFilters component', () => {
    renderChartFilters();
    const chartFiltersBox = screen.getByTestId('ChartFilters-ChartFiltersBox');
    expect(chartFiltersBox).toBeInTheDocument();
  });

  it('should render the correct number of ChartFilterButtonBox components', () => {
    renderChartFilters();
    const chartFilterButtonBoxes = screen.getAllByTestId(/^ChartFilters-ChartFilterButtonBox/);
    expect(chartFilterButtonBoxes).toHaveLength(filterOptions.length);
  });

  it('should call onModeChange when a mode filter button is clicked', () => {
    renderChartFilters();
    const modeFilterButton = screen.getByText('Mode 1');
    fireEvent.click(modeFilterButton);
    expect(mockOnModeChange).toHaveBeenCalledWith('mode1');
  });

  it('should call onTimeRangeChange when a time range filter button is clicked', () => {
    renderChartFilters();
    const timeRangeFilterButton = screen.getByText('Time Range 1');
    fireEvent.click(timeRangeFilterButton);
    expect(mockOnTimeRangeChange).toHaveBeenCalledWith('timeRange1');
  });

  it('should not call onModeChange or onTimeRangeChange when disabled', () => {
    renderChartFilters({ disabled: true });
    const modeFilterButton = screen.getByText('Mode 1');
    const timeRangeFilterButton = screen.getByText('Time Range 1');
    fireEvent.click(modeFilterButton);
    fireEvent.click(timeRangeFilterButton);
    expect(mockOnModeChange).not.toHaveBeenCalled();
    expect(mockOnTimeRangeChange).not.toHaveBeenCalled();
  });

  it('should not render an Underline component when underlineColorToken is not provided', () => {
    renderChartFilters({
      filterOptions: [
        {
          id: 'mode1',
          isMode: true,
          label: 'Mode 1',
        },
      ],
    });
    const underline = screen.queryByTestId('ChartFilterButtonBox-Underline');
    expect(underline).toBeNull();
  });
});
