import React from "react";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getByText, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

import axios from "axios";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

  const { container } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment")[0];
  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, 'no spots remaining')).toBeInTheDocument()
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));


  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));
  // 4. Check that the confirmation message is shown.
  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(getByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, '2 spots remaining')).toBeInTheDocument()
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  const { container, debug } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Sidney" }
  });

  fireEvent.click(getByText(appointment, "Save"));
  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Sidney"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, '1 spot remaining')).toBeInTheDocument()
})

it("shows the save error when failing to save an appointment", () => {
  axios.put.mockRejectedValueOnce();
});

it("shows the save error when failing to save an appointment", async () => {
  const { container } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment")[0];
  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Terry" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  axios.put.mockRejectedValueOnce();

  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Saving"));

  expect(getByText(appointment, "Error")).toBeInTheDocument();
});

it("shows the delete error when failing to delete an existing appointment", async () => {

  const { container } = render(<Application />);
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));
  expect(getByText(appointment, "Are you sure you would like to delete?")).toBeInTheDocument();

  axios.delete.mockRejectedValueOnce();

  fireEvent.click(getByText(appointment, "Confirm"));

  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Deleting"));

  expect(getByText(appointment, "Error")).toBeInTheDocument();
});