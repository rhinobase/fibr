# builder

The barebone builder UI made with `@rafty/ui`

## Layout

```jsx
<Workspace>
  <Header className="justify-center">Header</Header>
  <Container>
    <Sidebar>
      <SidebarItem
        name="palette"
        label="Palette"
        icon={<Squares2X2Icon className="size-5 stroke-2" />}
      >
        Palette Tab Content
      </SidebarItem>
      <SidebarItem
        name="over"
        label="Over"
        icon={<ListBulletIcon className="size-5 stroke-2" />}
      >
        Over Tab Content
      </SidebarItem>
    </Sidebar>
    <Canvas>
      <div className="flex items-center justify-center">Screen</div>
    </Canvas>
    <Settings />
  </Container>
  <Footer className="justify-center">Footer</Footer>
</Workspace>
```
