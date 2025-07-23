'use client';

import React, { useState } from 'react';
import {
    Alert,
    Badge,
    Breadcrumb,
    Button,
    Card,
    Dropdown,
    FormInput,
    FormSelect,
    FormTextarea,
    Loading,
    Modal,
    Pagination,
    Skeleton,
    Tabs,
    Accordion
} from '../components/ui';
import './showcase.css';

export default function DesignSystemShowcase() {
    const [currentTab, setCurrentTab] = useState('colors');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="showcase-container">
            <header className="showcase-header">
                <h1>ConstructPro Design System</h1>
                <p>A comprehensive guide to our UI components and design tokens</p>
            </header>

            <Tabs defaultValue={currentTab} onChange={setCurrentTab}>
                <Tabs.List className="showcase-tabs">
                    <Tabs.Trigger value="colors">Colors</Tabs.Trigger>
                    <Tabs.Trigger value="typography">Typography</Tabs.Trigger>
                    <Tabs.Trigger value="buttons">Buttons</Tabs.Trigger>
                    <Tabs.Trigger value="forms">Form Elements</Tabs.Trigger>
                    <Tabs.Trigger value="cards">Cards</Tabs.Trigger>
                    <Tabs.Trigger value="feedback">Feedback</Tabs.Trigger>
                    <Tabs.Trigger value="navigation">Navigation</Tabs.Trigger>
                    <Tabs.Trigger value="content">Content</Tabs.Trigger>
                </Tabs.List>

                {/* Colors Tab */}
                <Tabs.Content value="colors">
                    <section className="showcase-section">
                        <h2>Color Palette</h2>

                        <h3>Primary Colors</h3>
                        <div className="color-grid">
                            <div className="color-item">
                                <div className="color-swatch" style={{ backgroundColor: 'var(--primary-color)' }}></div>
                                <div className="color-info">
                                    <span className="color-name">Primary</span>
                                    <span className="color-value">#f9a825</span>
                                </div>
                            </div>
                            <div className="color-item">
                                <div className="color-swatch" style={{ backgroundColor: 'var(--accent-color)' }}></div>
                                <div className="color-info">
                                    <span className="color-name">Accent</span>
                                    <span className="color-value">#ff6f00</span>
                                </div>
                            </div>
                        </div>

                        <h3>Neutral Colors</h3>
                        <div className="color-grid">
                            <div className="color-item">
                                <div className="color-swatch" style={{ backgroundColor: 'var(--dark-color)' }}></div>
                                <div className="color-info">
                                    <span className="color-name">Dark</span>
                                    <span className="color-value">#212121</span>
                                </div>
                            </div>
                            <div className="color-item">
                                <div className="color-swatch" style={{ backgroundColor: 'var(--light-color)' }}></div>
                                <div className="color-info">
                                    <span className="color-name">Light</span>
                                    <span className="color-value">#f5f5f5</span>
                                </div>
                            </div>
                            <div className="color-item">
                                <div className="color-swatch" style={{ backgroundColor: 'var(--white-color)' }}></div>
                                <div className="color-info">
                                    <span className="color-name">White</span>
                                    <span className="color-value">#ffffff</span>
                                </div>
                            </div>
                        </div>

                        <h3>Steel Grays</h3>
                        <div className="color-grid">
                            <div className="color-item">
                                <div className="color-swatch" style={{ backgroundColor: 'var(--steel-gray)' }}></div>
                                <div className="color-info">
                                    <span className="color-name">Steel Gray</span>
                                    <span className="color-value">#546e7a</span>
                                </div>
                            </div>
                            <div className="color-item">
                                <div className="color-swatch" style={{ backgroundColor: 'var(--steel-gray-light)' }}></div>
                                <div className="color-info">
                                    <span className="color-name">Steel Gray Light</span>
                                    <span className="color-value">#78909c</span>
                                </div>
                            </div>
                            <div className="color-item">
                                <div className="color-swatch" style={{ backgroundColor: 'var(--steel-gray-dark)' }}></div>
                                <div className="color-info">
                                    <span className="color-name">Steel Gray Dark</span>
                                    <span className="color-value">#37474f</span>
                                </div>
                            </div>
                        </div>

                        <h3>Status Colors</h3>
                        <div className="color-grid">
                            <div className="color-item">
                                <div className="color-swatch" style={{ backgroundColor: 'var(--success-color)' }}></div>
                                <div className="color-info">
                                    <span className="color-name">Success</span>
                                    <span className="color-value">#28a745</span>
                                </div>
                            </div>
                            <div className="color-item">
                                <div className="color-swatch" style={{ backgroundColor: 'var(--warning-color)' }}></div>
                                <div className="color-info">
                                    <span className="color-name">Warning</span>
                                    <span className="color-value">#ffc107</span>
                                </div>
                            </div>
                            <div className="color-item">
                                <div className="color-swatch" style={{ backgroundColor: 'var(--danger-color)' }}></div>
                                <div className="color-info">
                                    <span className="color-name">Danger</span>
                                    <span className="color-value">#dc3545</span>
                                </div>
                            </div>
                            <div className="color-item">
                                <div className="color-swatch" style={{ backgroundColor: 'var(--info-color)' }}></div>
                                <div className="color-info">
                                    <span className="color-name">Info</span>
                                    <span className="color-value">#17a2b8</span>
                                </div>
                            </div>
                        </div>

                        <h3>Gray Scale</h3>
                        <div className="color-grid">
                            {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((weight) => (
                                <div key={weight} className="color-item">
                                    <div className="color-swatch" style={{ backgroundColor: `var(--gray-${weight})` }}></div>
                                    <div className="color-info">
                                        <span className="color-name">Gray {weight}</span>
                                        <span className="color-value">var(--gray-{weight})</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </Tabs.Content>

                {/* Typography Tab */}
                <Tabs.Content value="typography">
                    <section className="showcase-section">
                        <h2>Typography</h2>

                        <h3>Font Families</h3>
                        <div className="typography-sample">
                            <div className="font-family">
                                <h4>Montserrat (Headings)</h4>
                                <p className="font-montserrat">
                                    ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                                    abcdefghijklmnopqrstuvwxyz<br />
                                    0123456789
                                </p>
                            </div>
                            <div className="font-family">
                                <h4>Open Sans (Body)</h4>
                                <p className="font-opensans">
                                    ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />
                                    abcdefghijklmnopqrstuvwxyz<br />
                                    0123456789
                                </p>
                            </div>
                        </div>

                        <h3>Headings</h3>
                        <div className="typography-sample">
                            <h1 className="heading-1">Heading 1 (3rem / 48px)</h1>
                            <h2 className="heading-2">Heading 2 (2rem / 32px)</h2>
                            <h3 className="heading-3">Heading 3 (1.5rem / 24px)</h3>
                            <h4 className="heading-4">Heading 4 (1.25rem / 20px)</h4>
                        </div>

                        <h3>Body Text</h3>
                        <div className="typography-sample">
                            <p className="body-large">
                                Body Large (1.125rem / 18px): Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
                            </p>
                            <p className="body-normal">
                                Body Normal (1rem / 16px): Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
                            </p>
                            <p className="body-small">
                                Body Small (0.875rem / 14px): Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.
                            </p>
                        </div>

                        <h3>Labels & Captions</h3>
                        <div className="typography-sample">
                            <p className="label">Label Text (0.75rem / 12px)</p>
                            <p className="caption">Caption Text (0.75rem / 12px)</p>
                        </div>
                    </section>
                </Tabs.Content>

                {/* Buttons Tab */}
                <Tabs.Content value="buttons">
                    <section className="showcase-section">
                        <h2>Buttons</h2>

                        <h3>Variants</h3>
                        <div className="button-grid">
                            <div className="button-sample">
                                <Button variant="primary">Primary Button</Button>
                                <span className="sample-label">Primary</span>
                            </div>
                            <div className="button-sample">
                                <Button variant="secondary">Secondary Button</Button>
                                <span className="sample-label">Secondary</span>
                            </div>
                            <div className="button-sample">
                                <Button variant="outline">Outline Button</Button>
                                <span className="sample-label">Outline</span>
                            </div>
                            <div className="button-sample">
                                <Button variant="ghost">Ghost Button</Button>
                                <span className="sample-label">Ghost</span>
                            </div>
                        </div>

                        <h3>Sizes</h3>
                        <div className="button-grid">
                            <div className="button-sample">
                                <Button variant="primary" size="sm">Small Button</Button>
                                <span className="sample-label">Small</span>
                            </div>
                            <div className="button-sample">
                                <Button variant="primary">Default Button</Button>
                                <span className="sample-label">Default</span>
                            </div>
                            <div className="button-sample">
                                <Button variant="primary" size="lg">Large Button</Button>
                                <span className="sample-label">Large</span>
                            </div>
                            <div className="button-sample">
                                <Button variant="primary" size="xl">Extra Large</Button>
                                <span className="sample-label">Extra Large</span>
                            </div>
                        </div>

                        <h3>States</h3>
                        <div className="button-grid">
                            <div className="button-sample">
                                <Button variant="primary">Default State</Button>
                                <span className="sample-label">Default</span>
                            </div>
                            <div className="button-sample">
                                <Button variant="primary" disabled>Disabled State</Button>
                                <span className="sample-label">Disabled</span>
                            </div>
                            <div className="button-sample">
                                <Button variant="primary" loading>Loading State</Button>
                                <span className="sample-label">Loading</span>
                            </div>
                        </div>
                    </section>
                </Tabs.Content>

                {/* Forms Tab */}
                <Tabs.Content value="forms">
                    <section className="showcase-section">
                        <h2>Form Elements</h2>

                        <h3>Text Input</h3>
                        <div className="form-grid">
                            <div className="form-sample">
                                <FormInput
                                    label="Default Input"
                                    placeholder="Enter text here"
                                />
                                <span className="sample-label">Default</span>
                            </div>
                            <div className="form-sample">
                                <FormInput
                                    label="With Help Text"
                                    placeholder="Enter text here"
                                    helpText="This is some helpful information"
                                />
                                <span className="sample-label">With Help Text</span>
                            </div>
                            <div className="form-sample">
                                <FormInput
                                    label="With Error"
                                    placeholder="Enter text here"
                                    error="This field is required"
                                    value="Invalid input"
                                />
                                <span className="sample-label">Error State</span>
                            </div>
                            <div className="form-sample">
                                <FormInput
                                    label="Disabled Input"
                                    placeholder="Enter text here"
                                    disabled
                                    value="Disabled input"
                                />
                                <span className="sample-label">Disabled</span>
                            </div>
                        </div>

                        <h3>Select</h3>
                        <div className="form-grid">
                            <div className="form-sample">
                                <FormSelect
                                    label="Default Select"
                                    options={[
                                        { value: 'option1', label: 'Option 1' },
                                        { value: 'option2', label: 'Option 2' },
                                        { value: 'option3', label: 'Option 3' }
                                    ]}
                                />
                                <span className="sample-label">Default</span>
                            </div>
                            <div className="form-sample">
                                <FormSelect
                                    label="With Help Text"
                                    options={[
                                        { value: 'option1', label: 'Option 1' },
                                        { value: 'option2', label: 'Option 2' },
                                        { value: 'option3', label: 'Option 3' }
                                    ]}
                                    helpText="Select an option from the list"
                                />
                                <span className="sample-label">With Help Text</span>
                            </div>
                            <div className="form-sample">
                                <FormSelect
                                    label="With Error"
                                    options={[
                                        { value: 'option1', label: 'Option 1' },
                                        { value: 'option2', label: 'Option 2' },
                                        { value: 'option3', label: 'Option 3' }
                                    ]}
                                    error="Please select an option"
                                />
                                <span className="sample-label">Error State</span>
                            </div>
                            <div className="form-sample">
                                <FormSelect
                                    label="Disabled Select"
                                    options={[
                                        { value: 'option1', label: 'Option 1' },
                                        { value: 'option2', label: 'Option 2' },
                                        { value: 'option3', label: 'Option 3' }
                                    ]}
                                    disabled
                                />
                                <span className="sample-label">Disabled</span>
                            </div>
                        </div>

                        <h3>Textarea</h3>
                        <div className="form-grid">
                            <div className="form-sample">
                                <FormTextarea
                                    label="Default Textarea"
                                    placeholder="Enter text here"
                                />
                                <span className="sample-label">Default</span>
                            </div>
                            <div className="form-sample">
                                <FormTextarea
                                    label="With Help Text"
                                    placeholder="Enter text here"
                                    helpText="Enter a detailed description"
                                />
                                <span className="sample-label">With Help Text</span>
                            </div>
                            <div className="form-sample">
                                <FormTextarea
                                    label="With Error"
                                    placeholder="Enter text here"
                                    error="This field is required"
                                    value="Invalid input"
                                />
                                <span className="sample-label">Error State</span>
                            </div>
                            <div className="form-sample">
                                <FormTextarea
                                    label="Disabled Textarea"
                                    placeholder="Enter text here"
                                    disabled
                                    value="Disabled textarea"
                                />
                                <span className="sample-label">Disabled</span>
                            </div>
                        </div>
                    </section>
                </Tabs.Content>

                {/* Cards Tab */}
                <Tabs.Content value="cards">
                    <section className="showcase-section">
                        <h2>Cards</h2>

                        <h3>Variants</h3>
                        <div className="card-grid">
                            <div className="card-sample">
                                <Card>
                                    <Card.Body>
                                        <h3>Default Card</h3>
                                        <p>This is a basic card with default styling.</p>
                                    </Card.Body>
                                </Card>
                                <span className="sample-label">Default</span>
                            </div>
                            <div className="card-sample">
                                <Card variant="elevated">
                                    <Card.Body>
                                        <h3>Elevated Card</h3>
                                        <p>This card has elevated styling with more pronounced shadow.</p>
                                    </Card.Body>
                                </Card>
                                <span className="sample-label">Elevated</span>
                            </div>
                            <div className="card-sample">
                                <Card variant="bordered">
                                    <Card.Body>
                                        <h3>Bordered Card</h3>
                                        <p>This card has a more pronounced border.</p>
                                    </Card.Body>
                                </Card>
                                <span className="sample-label">Bordered</span>
                            </div>
                            <div className="card-sample">
                                <Card variant="primary">
                                    <Card.Body>
                                        <h3>Primary Card</h3>
                                        <p>This card uses the primary color for emphasis.</p>
                                    </Card.Body>
                                </Card>
                                <span className="sample-label">Primary</span>
                            </div>
                        </div>

                        <h3>Card with Header and Footer</h3>
                        <div className="card-sample full-width">
                            <Card>
                                <Card.Header>
                                    <h3>Card Header</h3>
                                </Card.Header>
                                <Card.Body>
                                    <p>This card has a header and footer section.</p>
                                    <p>The body contains the main content of the card.</p>
                                </Card.Body>
                                <Card.Footer>
                                    <Button variant="primary">Primary Action</Button>
                                    <Button variant="ghost">Secondary Action</Button>
                                </Card.Footer>
                            </Card>
                        </div>
                    </section>
                </Tabs.Content>

                {/* Feedback Tab */}
                <Tabs.Content value="feedback">
                    <section className="showcase-section">
                        <h2>Feedback Components</h2>

                        <h3>Alerts</h3>
                        <div className="feedback-grid">
                            <Alert variant="success" title="Success Alert">
                                This operation was completed successfully.
                            </Alert>
                            <Alert variant="warning" title="Warning Alert">
                                Please review the information before proceeding.
                            </Alert>
                            <Alert variant="error" title="Error Alert">
                                An error occurred while processing your request.
                            </Alert>
                            <Alert variant="info" title="Information Alert">
                                Here is some important information you should know.
                            </Alert>
                        </div>

                        <h3>Badges</h3>
                        <div className="badge-grid">
                            <Badge variant="primary">Primary</Badge>
                            <Badge variant="success">Success</Badge>
                            <Badge variant="warning">Warning</Badge>
                            <Badge variant="danger">Danger</Badge>
                            <Badge variant="gray">Gray</Badge>
                        </div>

                        <h3>Loading Indicators</h3>
                        <div className="loading-grid">
                            <div className="loading-sample">
                                <Loading size="sm" />
                                <span className="sample-label">Small</span>
                            </div>
                            <div className="loading-sample">
                                <Loading />
                                <span className="sample-label">Medium</span>
                            </div>
                            <div className="loading-sample">
                                <Loading size="lg" />
                                <span className="sample-label">Large</span>
                            </div>
                        </div>

                        <h3>Modal</h3>
                        <div className="modal-sample">
                            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                                Open Modal
                            </Button>

                            <Modal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                                title="Example Modal"
                            >
                                <p>This is an example modal dialog.</p>
                                <p>Modals are used for focused interactions and confirmations.</p>
                                <div className="modal-actions">
                                    <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                                        Confirm
                                    </Button>
                                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </Modal>
                        </div>

                        <h3>Skeleton Loading</h3>
                        <div className="skeleton-sample">
                            <Card>
                                <Card.Body>
                                    <Skeleton.Avatar size="lg" />
                                    <Skeleton.Text lines={3} />
                                    <Skeleton.Button />
                                </Card.Body>
                            </Card>
                        </div>
                    </section>
                </Tabs.Content>

                {/* Navigation Tab */}
                <Tabs.Content value="navigation">
                    <section className="showcase-section">
                        <h2>Navigation Components</h2>

                        <h3>Breadcrumb</h3>
                        <div className="breadcrumb-sample">
                            <Breadcrumb
                                items={[
                                    { label: 'Home', href: '/' },
                                    { label: 'Products', href: '/products' },
                                    { label: 'Category', href: '/products/category' },
                                    { label: 'Product Name' }
                                ]}
                            />
                        </div>

                        <h3>Pagination</h3>
                        <div className="pagination-sample">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={10}
                                onPageChange={setCurrentPage}
                            />
                        </div>

                        <h3>Dropdown</h3>
                        <div className="dropdown-sample">
                            <Dropdown
                                items={[
                                    { value: 'option1', label: 'Option 1' },
                                    { value: 'option2', label: 'Option 2' },
                                    { value: 'option3', label: 'Option 3' },
                                    { value: 'option4', label: 'Option 4' }
                                ]}
                                placeholder="Select an option"
                            />
                        </div>
                    </section>
                </Tabs.Content>

                {/* Content Tab */}
                <Tabs.Content value="content">
                    <section className="showcase-section">
                        <h2>Content Components</h2>

                        <h3>Accordion</h3>
                        <div className="accordion-sample">
                            <Accordion>
                                <Accordion.Item id="item1" title="Accordion Item 1">
                                    <p>This is the content for accordion item 1.</p>
                                    <p>Accordions are useful for organizing content into collapsible sections.</p>
                                </Accordion.Item>
                                <Accordion.Item id="item2" title="Accordion Item 2">
                                    <p>This is the content for accordion item 2.</p>
                                    <p>They help reduce visual clutter and allow users to focus on specific content.</p>
                                </Accordion.Item>
                                <Accordion.Item id="item3" title="Accordion Item 3">
                                    <p>This is the content for accordion item 3.</p>
                                    <p>Each item can be expanded or collapsed independently.</p>
                                </Accordion.Item>
                            </Accordion>
                        </div>

                        <h3>Tabs</h3>
                        <div className="tabs-sample">
                            <Tabs defaultValue="tab1">
                                <Tabs.List>
                                    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                                    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                                    <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                                </Tabs.List>
                                <Tabs.Content value="tab1">
                                    <div className="tab-content">
                                        <h4>Tab 1 Content</h4>
                                        <p>This is the content for tab 1.</p>
                                    </div>
                                </Tabs.Content>
                                <Tabs.Content value="tab2">
                                    <div className="tab-content">
                                        <h4>Tab 2 Content</h4>
                                        <p>This is the content for tab 2.</p>
                                    </div>
                                </Tabs.Content>
                                <Tabs.Content value="tab3">
                                    <div className="tab-content">
                                        <h4>Tab 3 Content</h4>
                                        <p>This is the content for tab 3.</p>
                                    </div>
                                </Tabs.Content>
                            </Tabs>
                        </div>
                    </section>
                </Tabs.Content>
            </Tabs>
        </div>
    );
}