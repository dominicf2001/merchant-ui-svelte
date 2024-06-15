{ pkgs, lib, config, inputs, ... }:

{
  packages = [ pkgs.nodejs ];

  languages.typescript.enable = true;
}
