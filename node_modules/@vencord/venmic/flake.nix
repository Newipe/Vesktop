{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-26.05";
    nixpkgs-pipewire.url = "github:NixOS/nixpkgs/17cda7ed37dddb0bde2b057c8e2234e8a7b91706";
  };

  outputs =
    { nixpkgs, nixpkgs-pipewire, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      forAllSystems = nixpkgs.lib.genAttrs systems;
    in
    {
      devShells = forAllSystems (
        system:
        let
          pkgs = import nixpkgs { inherit system; };
          pipewirePkgs = import nixpkgs-pipewire { inherit system; };
          llvmPkgs = pkgs.llvmPackages;
        in
        {
          default =
            pkgs.mkShell.override
              {
                stdenv = llvmPkgs.stdenv;
              }
              {
                name = "venmic-dev-shell";

                CC = "${llvmPkgs.clang}/bin/clang";
                CXX = "${llvmPkgs.clang}/bin/clang++";

                nativeBuildInputs = with pkgs; [
                  llvmPkgs.lldb
                  llvmPkgs.clang

                  zig
                  ninja

                  cmake
                  pkg-config

                  pnpm
                  nodejs

                  git
                  clang-tools
                ];

                buildInputs = [
                  pipewirePkgs.pipewire
                  pipewirePkgs.pulseaudio
                ];
              };
        }
      );
    };
}
